'use strict';

/**
 * Library Lab — Demo Server
 *
 * Serves the Angular app from dist/ and answers every API call with
 * realistic mock data.  No database, no Spring Boot backend needed.
 *
 * HOW TO RUN:
 *   1. From the frontend root: npm run build:demo
 *      (or: npx ng build --configuration=demo)
 *   2. cd demo && npm install
 *   3. node server.js
 *   4. Open http://localhost:3000
 */

const express = require('express');
const path    = require('path');
const fs      = require('fs');
const mock    = require('./mock-data');

const app  = express();
const PORT = process.env.PORT || 3000;
const DIST = path.join(__dirname, 'dist');

// ── Guard: make sure the Angular build exists ─────────────────────────────────
if (!fs.existsSync(DIST)) {
  console.error('\n  ✗  dist/ folder not found.\n');
  console.error('  Run the following command from the FRONTEND root first:');
  console.error('  npm run build:demo\n');
  process.exit(1);
}

// ── Helpers ───────────────────────────────────────────────────────────────────
app.use(express.json());

/** Placeholder SVG book cover */
function bookCoverSvg(title) {
  const safe = (title || 'Book').replace(/[<>&"]/g, '');
  return `<svg xmlns="http://www.w3.org/2000/svg" width="150" height="200">
    <rect width="150" height="200" rx="4" fill="#3f51b5"/>
    <rect x="10" y="10" width="130" height="180" rx="2" fill="rgba(255,255,255,.08)"/>
    <text x="75" y="100" text-anchor="middle" fill="white"
          font-size="11" font-family="Arial" font-weight="bold">${safe}</text>
    <text x="75" y="170" text-anchor="middle" fill="rgba(255,255,255,.5)"
          font-size="9" font-family="Arial">DEMO</text>
  </svg>`;
}

/** Placeholder app logo SVG */
const logoSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="160" height="44">
  <rect width="160" height="44" rx="6" fill="#3f51b5"/>
  <text x="80" y="28" text-anchor="middle" fill="white"
        font-size="16" font-family="Arial" font-weight="bold">Library Lab</text>
</svg>`;

// ── Serve Angular static assets ───────────────────────────────────────────────
app.use(express.static(DIST));

// ── Serve demo patch scripts ─────────────────────────────────────────────────
app.get('/nav-fix.js', (_req, res) => {
  res.setHeader('Content-Type', 'application/javascript');
  res.sendFile(path.join(__dirname, 'nav-fix.js'));
});

// ── Demo banner injection: any HTML response gets the demo bar ────────────────
// (handled on the Angular side via styles.css — nothing extra needed here)

// ─────────────────────────────────────────────────────────────────────────────
// MOCK API ROUTES
// Every GET returns mock JSON; every mutating request (POST/PUT/DELETE/PATCH)
// returns { success: true } so the UI doesn't throw errors.
// ─────────────────────────────────────────────────────────────────────────────

// ── Version / Logo ────────────────────────────────────────────────────────────
app.get('/version/get/logo', (_req, res) => {
  res.setHeader('Content-Type', 'image/svg+xml');
  res.send(logoSvg);
});

// ── Analytics ─────────────────────────────────────────────────────────────────
app.get('/analytics/shortanalytics/',       (_req, res) => res.json(mock.shortAnalytics));
app.get('/analytics/bookbycategory/',       (_req, res) => res.json(mock.bookByCategoryData));
app.get('/analytics/bookbyauthor/',         (_req, res) => res.json(mock.bookByAuthorData));
app.get('/analytics/expenses/',             (_req, res) => res.json(mock.expensesMulti));
app.get('/analytics/incomes/',              (_req, res) => res.json(mock.incomesMulti));

// ── Books ─────────────────────────────────────────────────────────────────────
app.get('/book/all',                        (_req, res) => res.json(mock.books));
app.get('/book/archived',                   (_req, res) => res.json([]));
app.get('/book/destroyed',                  (_req, res) => res.json([]));
app.get('/book/categories',                 (_req, res) => res.json(mock.categories));
app.get('/book/types',                      (_req, res) => res.json(mock.mediaTypes));
app.get('/book/publications-by-authors',    (_req, res) => res.json(mock.publicationsByAuthors));
app.get('/book/publication-distribution-by-genre', (_req, res) => res.json(mock.publicationsByGenre));
app.get('/book/by-department-shelves',      (_req, res) => res.json(mock.books));

// Book cover image (placeholder SVG)
app.get('/book/get/:id/:filename', (req, res) => {
  const book = mock.books.find(b => b.id == req.params.id);
  res.setHeader('Content-Type', 'image/svg+xml');
  res.send(bookCoverSvg(book ? book.title : 'Book'));
});

// Single book — must come after named routes
app.get('/book/:id', (req, res) => {
  const book = mock.books.find(b => b.id == req.params.id);
  res.json(book || mock.books[0]);
});

// ── Categories ────────────────────────────────────────────────────────────────
app.get('/category/all',         (_req, res) => res.json(mock.categories));
app.get('/category/:id',         (req, res)  => res.json(mock.categories.find(c => c.id == req.params.id) || mock.categories[0]));

// ── Members ───────────────────────────────────────────────────────────────────
app.get('/member/all',           (_req, res) => res.json(mock.members));
app.get('/member/:id',           (req, res)  => res.json(mock.members.find(m => m.id == req.params.id) || mock.members[0]));

// ── Writers ───────────────────────────────────────────────────────────────────
app.get('/writer/all',           (_req, res) => res.json(mock.writers));
app.get('/writer/:id',           (req, res)  => res.json(mock.writers.find(w => w.id == req.params.id) || mock.writers[0]));

// ── Publishers ────────────────────────────────────────────────────────────────
app.get('/publisher/all',        (_req, res) => res.json(mock.publishers));

// ── Circulations ──────────────────────────────────────────────────────────────
app.get('/circulation/all',      (_req, res) => res.json(mock.circulations));
app.get('/circulation/:id',      (req, res)  => res.json(mock.circulations.find(c => c.id == req.params.id) || mock.circulations[0]));

// ── Circulation Status ────────────────────────────────────────────────────────
app.get('/circulation-status/all', (_req, res) => res.json(mock.circulationStatuses));

// ── Member Types ──────────────────────────────────────────────────────────────
app.get('/type-member/all',      (_req, res) => res.json(mock.memberTypes));

// ── Media Types ───────────────────────────────────────────────────────────────
app.get('/mediatype/all',                    (_req, res) => res.json(mock.mediaTypes));
app.get('/mediatype/items-by-type',          (_req, res) => res.json(mock.itemsByType));
app.get('/mediatype/distribution-by-genre',  (_req, res) => res.json(mock.distributionByGenre));

// ── Departments / Shelves / Rows ──────────────────────────────────────────────
app.get('/department/all',           (_req, res) => res.json(mock.departments));
app.get('/shelf/all',                (_req, res) => res.json(mock.shelves));
app.get('/row/all',                  (_req, res) => res.json(mock.rows));
app.get('/physical-description/all', (_req, res) => res.json(mock.physicalDescriptions));

// ── Account ───────────────────────────────────────────────────────────────────
app.get('/expense/all',          (_req, res) => res.json(mock.expenses));
app.get('/income/all',           (_req, res) => res.json(mock.incomes));
app.get('/budget/all',           (_req, res) => res.json([]));
app.get('/fund/all',             (_req, res) => res.json([]));

// ── Overdues ──────────────────────────────────────────────────────────────────
app.get('/overdue/all',          (_req, res) => res.json(mock.overdues));
app.get('/overdue-fine/all',     (_req, res) => res.json([]));

// ── Requested Books ───────────────────────────────────────────────────────────
app.get('/requested-book/all',   (_req, res) => res.json(mock.requestedBooks));

// ── Payments ──────────────────────────────────────────────────────────────────
app.get('/payment/all',          (_req, res) => res.json([]));
app.get('/membership-plan/all',  (_req, res) => res.json([]));

// ── Acquisitions ──────────────────────────────────────────────────────────────
app.get('/vendor/all',              (_req, res) => res.json([]));
app.get('/basket/all',              (_req, res) => res.json([]));
app.get('/contract/all',            (_req, res) => res.json([]));
app.get('/order/all',               (_req, res) => res.json([]));
app.get('/invoice/all',             (_req, res) => res.json([]));
app.get('/purchase-suggestion/all', (_req, res) => res.json([]));

// ── Notices ───────────────────────────────────────────────────────────────────
app.get('/notice/all',           (_req, res) => res.json([]));
app.get('/notice-template/all',  (_req, res) => res.json([]));

// ── Identification ────────────────────────────────────────────────────────────
app.get('/qr-code/all',          (_req, res) => res.json([]));
app.get('/bar-code/all',         (_req, res) => res.json([]));

// ── Item Types / Tags ─────────────────────────────────────────────────────────
app.get('/item-types/all',       (_req, res) => res.json(mock.itemTypes));
app.get('/tag/all',              (_req, res) => res.json(mock.tags));

// ── eBooks / Digital Docs ─────────────────────────────────────────────────────
app.get('/ebook/all',            (_req, res) => res.json([]));
app.get('/digital-doc/all',      (_req, res) => res.json([]));

// ── Settings ──────────────────────────────────────────────────────────────────
app.get('/settings/all',         (_req, res) => res.json(mock.settings));
app.get('/settings/:id',         (_req, res) => res.json(mock.settings[0]));

// ── i18n ──────────────────────────────────────────────────────────────────────
app.get('/i18n/menu/:lang',      (_req, res) => res.json(mock.menuI18n));
app.get('/i18n/dashboard/:lang', (_req, res) => res.json(mock.dashboardI18n));
app.get('/i18n/book/:lang',      (_req, res) => res.json(mock.bookI18n));
app.get('/i18n/:resource/:lang', (_req, res) => res.json({}));

// ── Reports (return empty arrays — pages render but no data rows) ─────────────
app.get('/report/*',             (_req, res) => res.json([]));
app.get('/borrowing-statistics', (_req, res) => res.json([]));

// ── OPAC ──────────────────────────────────────────────────────────────────────
// OPAC components typically call /book/all and /category/all (already handled above)
app.get('/opac/*',               (_req, res) => res.json([]));

// ── Catch-all: unknown GET → return [] (safe for any list component) ──────────
app.get('/api/*', (_req, res) => res.json([]));

// ── Mutable requests (POST / PUT / DELETE / PATCH) ────────────────────────────
// Return a success envelope so the UI doesn't throw errors.
app.use((req, res, next) => {
  if (['POST', 'PUT', 'DELETE', 'PATCH'].includes(req.method)) {
    return res.json({
      success: true,
      message: 'Demo mode — changes are not persisted.',
    });
  }
  next();
});

// ── SPA fallback — Angular handles client-side routing ───────────────────────
// Inject nav-fix.js to fix mat-expansion-panel in demo (OnPush CD not running)
app.get('*', (_req, res) => {
  const html = fs.readFileSync(path.join(DIST, 'index.html'), 'utf8');
  const patched = html.replace('</body>', '<script src="/nav-fix.js"></script></body>');
  res.setHeader('Content-Type', 'text/html');
  res.send(patched);
});

// ─────────────────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log('\n  ╔══════════════════════════════════════════════╗');
  console.log(`  ║  Library Lab Demo  →  http://localhost:${PORT}  ║`);
  console.log('  ╚══════════════════════════════════════════════╝\n');
  console.log('  No backend required — all data is simulated.\n');
});
