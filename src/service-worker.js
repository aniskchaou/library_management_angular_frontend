/**
 * Library Lab Service Worker — Offline-first strategy for barcode scanning & OPAC.
 *
 * Cache strategies:
 *  - App shell (HTML/JS/CSS): Cache-first (for offline availability)
 *  - API calls to /book/all and /category/all: Stale-while-revalidate (offline OPAC)
 *  - Barcode scan queue: IndexedDB queue replayed when online
 */

const CACHE_NAME = 'librarylab-v1';
const API_CACHE  = 'librarylab-api-v1';
const OFFLINE_FALLBACK = '/offline.html';

// App shell assets to cache on install
const PRECACHE_ASSETS = [
  '/',
  '/index.html',
  '/manifest.webmanifest',
  '/assets/images/no-cover.png',
];

// API routes to cache for offline OPAC browsing
const CACHEABLE_API_PATTERNS = [
  /\/book\/all/,
  /\/category\/all/,
  /\/mediatype\/all/,
  /\/writer\/all/,
];

// ── Offline scan queue (IndexedDB) ────────────────────────────────────────────
const SCAN_QUEUE_DB  = 'librarylab-scan-queue';
const SCAN_QUEUE_STORE = 'scans';

async function openScanQueue() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(SCAN_QUEUE_DB, 1);
    req.onupgradeneeded = e => {
      e.target.result.createObjectStore(SCAN_QUEUE_STORE, { autoIncrement: true });
    };
    req.onsuccess = e => resolve(e.target.result);
    req.onerror   = () => reject(req.error);
  });
}

async function queueScan(payload) {
  const db = await openScanQueue();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(SCAN_QUEUE_STORE, 'readwrite');
    tx.objectStore(SCAN_QUEUE_STORE).add({ payload, timestamp: Date.now() });
    tx.oncomplete = () => resolve();
    tx.onerror    = () => reject(tx.error);
  });
}

async function flushScanQueue(baseUrl) {
  const db = await openScanQueue();
  const tx = db.transaction(SCAN_QUEUE_STORE, 'readwrite');
  const store = tx.objectStore(SCAN_QUEUE_STORE);
  const all = await new Promise((res, rej) => {
    const req = store.getAll(); req.onsuccess = () => res(req.result); req.onerror = rej;
  });
  for (const item of all) {
    try {
      await fetch(`${baseUrl}/rfid/scan`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item.payload),
      });
    } catch (ignored) {}
  }
  store.clear();
}

// ── Install: precache app shell ───────────────────────────────────────────────
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(PRECACHE_ASSETS))
      .then(() => self.skipWaiting())
  );
});

// ── Activate: clean old caches ────────────────────────────────────────────────
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys
        .filter(k => k !== CACHE_NAME && k !== API_CACHE)
        .map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

// ── Fetch: cache strategies ───────────────────────────────────────────────────
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // Don't intercept non-GET requests (except offline scan queue)
  if (request.method !== 'GET') {
    // Queue RFID scan POSTs when offline
    if (url.pathname.includes('/rfid/scan')) {
      event.respondWith(
        fetch(request).catch(async () => {
          const body = await request.clone().json().catch(() => ({}));
          await queueScan(body);
          return new Response(JSON.stringify({ queued: true, offline: true }), {
            headers: { 'Content-Type': 'application/json' },
          });
        })
      );
    }
    return;
  }

  // API calls — stale-while-revalidate for OPAC data
  const isCacheableApi = CACHEABLE_API_PATTERNS.some(p => p.test(url.pathname));
  if (isCacheableApi) {
    event.respondWith(
      caches.open(API_CACHE).then(async cache => {
        const cached = await cache.match(request);
        const networkFetch = fetch(request).then(response => {
          if (response.ok) cache.put(request, response.clone());
          return response;
        }).catch(() => null);
        return cached || networkFetch;
      })
    );
    return;
  }

  // App shell — cache-first
  if (url.origin === self.location.origin) {
    event.respondWith(
      caches.match(request).then(cached => cached || fetch(request))
    );
  }
});

// ── Background sync: flush offline scan queue ─────────────────────────────────
self.addEventListener('sync', event => {
  if (event.tag === 'sync-scans') {
    event.waitUntil(flushScanQueue(self.registration.scope.replace(/\/$/, '')));
  }
});

// ── Push notification handler ─────────────────────────────────────────────────
self.addEventListener('push', event => {
  const data = event.data ? event.data.json() : {};
  const title = data.notification?.title || 'Library Lab';
  const options = {
    body:    data.notification?.body || '',
    icon:    '/assets/images/icon-192.png',
    badge:   '/assets/images/icon-192.png',
    data:    data.data || {},
    actions: [
      { action: 'view', title: 'View' },
      { action: 'dismiss', title: 'Dismiss' },
    ],
  };
  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', event => {
  event.notification.close();
  if (event.action !== 'dismiss') {
    event.waitUntil(clients.openWindow('/'));
  }
});
