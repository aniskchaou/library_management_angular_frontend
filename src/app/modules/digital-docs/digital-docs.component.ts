import {
  Component, ElementRef, OnDestroy, OnInit, ViewChild,
} from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { URLLoader } from 'src/app/main/configs/URLLoader';
import CatalogItem from 'src/app/main/models/Book';
import Category from 'src/app/main/models/Category';
import { FileUploadService } from 'src/app/main/services/FileUploadService ';
import { HTTPService } from 'src/app/main/services/HTTPService';
import CONFIG from 'src/app/main/urls/urls';
import { HttpEventType } from '@angular/common/http';

// ─── DRM / access rule model ──────────────────────────────────────────────────
export interface DocAccessRule {
  /** Who can open the viewer */
  viewAccess: 'public' | 'member' | 'admin';
  /** Who can trigger the download button */
  downloadAccess: 'all' | 'member' | 'admin' | 'none';
  /** Who can trigger the print button */
  printAccess: 'all' | 'member' | 'admin' | 'none';
  /** Show visible watermark in viewer */
  watermark: boolean;
  /** Auto-close session after N minutes (0 = unlimited) */
  sessionMinutes: number;
  /** Copyright / rights statement shown in viewer */
  copyright: string;
  /** Enable DRM protections (right-click, copy prevention) */
  drm: boolean;
}

const DEFAULT_RULE: DocAccessRule = {
  viewAccess: 'admin',
  downloadAccess: 'admin',
  printAccess: 'admin',
  watermark: true,
  sessionMinutes: 60,
  copyright: 'All rights reserved. Unauthorized reproduction or distribution prohibited.',
  drm: true,
};

const RULES_KEY = 'ddm_access_rules'; // localStorage key

@Component({
  selector: 'app-digital-docs',
  templateUrl: './digital-docs.component.html',
  styleUrls: ['./digital-docs.component.css'],
  standalone: false,
})
export class DigitalDocsComponent extends URLLoader implements OnInit, OnDestroy {

  // ─── State ────────────────────────────────────────────────────────────────
  activeTab: 'library' | 'access' | 'upload' = 'library';
  loading = false;

  // ─── All catalog items ────────────────────────────────────────────────────
  allBooks: CatalogItem[] = [];
  categories: Category[] = [];

  // ─── Library filters ──────────────────────────────────────────────────────
  filterQuery   = '';
  filterCat     = 0;
  filterType: 'all' | 'pdf' | 'link' = 'all';
  get pdfCount(): number { return this.allBooks.filter(b => !!b.pdf).length; }
  get linkCount(): number { return this.allBooks.filter(b => !!b.link).length; }

  get filteredDocs(): CatalogItem[] {
    return this.allBooks.filter(b => {
      const hasDoc = this.filterType === 'all'
        ? (b.pdf || b.link)
        : this.filterType === 'pdf' ? !!b.pdf : !!b.link;
      if (!hasDoc) return false;
      if (this.filterCat && b.category?.id !== this.filterCat) return false;
      if (this.filterQuery) {
        const q = this.filterQuery.toLowerCase();
        return (b.title || '').toLowerCase().includes(q)
            || (b.writer?.name || '').toLowerCase().includes(q)
            || (b.isbn || '').toLowerCase().includes(q);
      }
      return true;
    });
  }

  // ─── Upload form ──────────────────────────────────────────────────────────
  uploadBookId: number | null = null;
  uploadFile: File | null = null;
  uploadProgress: number | null = null;
  uploadLink = '';
  uploadSaving = false;

  // ─── Viewer ───────────────────────────────────────────────────────────────
  viewerOpen  = false;
  viewerBook: CatalogItem | null = null;
  viewerPdfData: Uint8Array | null = null;    // blob loaded via auth
  viewerExternalUrl: string | null = null;    // for link-only docs
  viewerLoadingPdf = false;

  /** Current user identity for watermark */
  get viewerIdentity(): string {
    return localStorage.getItem('username') || localStorage.getItem('opac_reader_email') || 'Anonymous';
  }

  /** Session timer */
  private _sessionTimerId: ReturnType<typeof setInterval> | null = null;
  sessionRemaining = 0;   // seconds, 0 = unlimited

  // ─── Access rules ─────────────────────────────────────────────────────────
  private _rules: Map<number, DocAccessRule> = new Map();
  editingRule: DocAccessRule | null = null;
  editingRuleId: number | null = null;

  // ─── Viewer controls derived from rule ────────────────────────────────────
  get currentRule(): DocAccessRule {
    return this._rules.get(this.viewerBook?.id) ?? { ...DEFAULT_RULE };
  }
  get showDownloadBtn(): boolean {
    return this._resolveAccess(this.currentRule.downloadAccess);
  }
  get showPrintBtn(): boolean {
    return this._resolveAccess(this.currentRule.printAccess);
  }

  constructor(
    private httpService: HTTPService,
    private fileUploadService: FileUploadService,
    private http: HttpClient,
  ) { super(); }

  // ─── Lifecycle ────────────────────────────────────────────────────────────

  ngOnInit(): void {
    this.loadScripts();
    this._loadRules();
    this._loadData();
  }

  ngOnDestroy(): void {
    this._clearTimer();
  }

  // ─── Data loading ──────────────────────────────────────────────────────────

  private _loadData(): void {
    this.loading = true;
    let booksDone = false; let catsDone = false;
    const _done = () => { if (booksDone && catsDone) this.loading = false; };

    this.httpService.getAll(CONFIG.URL_BASE + '/book/all').subscribe({
      next: (data: CatalogItem[]) => { this.allBooks = data || []; booksDone = true; _done(); },
      error: (e: HttpErrorResponse) => { super.show('Error', e.message, 'warning'); this.loading = false; },
    });

    this.httpService.getAll(CONFIG.URL_BASE + '/category/all').subscribe({
      next: (data: Category[]) => { this.categories = data || []; catsDone = true; _done(); },
      error: () => { catsDone = true; _done(); },
    });
  }

  // ─── Access rules (localStorage) ─────────────────────────────────────────

  private _loadRules(): void {
    try {
      const raw = localStorage.getItem(RULES_KEY);
      if (raw) {
        const obj: Record<string, DocAccessRule> = JSON.parse(raw);
        this._rules = new Map(Object.entries(obj).map(([k, v]) => [Number(k), v]));
      }
    } catch { /* ignore corrupt data */ }
  }

  private _saveRules(): void {
    const obj: Record<string, DocAccessRule> = {};
    this._rules.forEach((v, k) => { obj[String(k)] = v; });
    localStorage.setItem(RULES_KEY, JSON.stringify(obj));
  }

  getRuleFor(id: number): DocAccessRule {
    return this._rules.get(id) ?? { ...DEFAULT_RULE };
  }

  startEditRule(book: CatalogItem): void {
    this.editingRuleId = book.id;
    this.editingRule = { ...this.getRuleFor(book.id) };
  }

  saveRule(): void {
    if (this.editingRuleId !== null) {
      this._rules.set(this.editingRuleId, { ...this.editingRule });
      this._saveRules();
    }
    this.editingRule = null;
    this.editingRuleId = null;
  }

  cancelRule(): void {
    this.editingRule = null;
    this.editingRuleId = null;
  }

  resetRule(id: number): void {
    this._rules.delete(id);
    this._saveRules();
  }

  accessDocs(): CatalogItem[] {
    return this.allBooks.filter(b => b.pdf || b.link);
  }

  // ─── Viewer ───────────────────────────────────────────────────────────────

  openViewer(book: CatalogItem): void {
    const rule = this.getRuleFor(book.id);
    if (!this._resolveAccess(rule.viewAccess as any)) {
      super.show('Access Denied', 'You do not have permission to view this document.', 'warning');
      return;
    }

    this.viewerBook     = book;
    this.viewerOpen     = true;
    this.viewerPdfData  = null;
    this.viewerExternalUrl = null;
    this.sessionRemaining = rule.sessionMinutes > 0 ? rule.sessionMinutes * 60 : 0;

    if (book.pdf) {
      this._loadPdfBlob(book.id);
    } else if (book.link) {
      this.viewerExternalUrl = book.link;
    }

    this._startTimer(rule.sessionMinutes);
  }

  closeViewer(): void {
    this.viewerOpen        = false;
    this.viewerBook        = null;
    this.viewerPdfData     = null;
    this.viewerExternalUrl = null;
    this._clearTimer();
  }

  /** Fetch the PDF via auth header → Uint8Array (URL never exposed to DOM) */
  private _loadPdfBlob(bookId: number): void {
    this.viewerLoadingPdf = true;
    const username = localStorage.getItem('username') || '';
    const password = localStorage.getItem('password') || '';
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(username + ':' + password),
    });
    this.http.get(`${CONFIG.URL_BASE}/book/pdf/${bookId}`, {
      headers,
      responseType: 'arraybuffer',
    }).subscribe({
      next: (buf: ArrayBuffer) => {
        this.viewerPdfData    = new Uint8Array(buf);
        this.viewerLoadingPdf = false;
      },
      error: (e: HttpErrorResponse) => {
        this.viewerLoadingPdf = false;
        super.show('Error', 'Failed to load PDF: ' + e.message, 'error');
      },
    });
  }

  /** Block context menu on viewer overlay */
  onViewerContextMenu(event: MouseEvent): void {
    const rule = this.currentRule;
    if (rule.drm) event.preventDefault();
  }

  // ─── Session timer ────────────────────────────────────────────────────────

  private _startTimer(minutes: number): void {
    this._clearTimer();
    if (minutes <= 0) return;
    this._sessionTimerId = setInterval(() => {
      this.sessionRemaining--;
      if (this.sessionRemaining <= 0) {
        this.closeViewer();
        super.show('Session Expired', 'Your reading session has ended.', 'info');
      }
    }, 1000);
  }

  private _clearTimer(): void {
    if (this._sessionTimerId !== null) {
      clearInterval(this._sessionTimerId);
      this._sessionTimerId = null;
    }
  }

  timerLabel(): string {
    if (this.sessionRemaining <= 0) return '';
    const m = Math.floor(this.sessionRemaining / 60);
    const s = this.sessionRemaining % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  }

  // ─── Upload ───────────────────────────────────────────────────────────────

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.uploadFile = input?.files?.[0] ?? null;
  }

  uploadPdf(): void {
    if (!this.uploadBookId || !this.uploadFile) {
      super.show('Validation', 'Select a catalog item and a PDF file.', 'warning');
      return;
    }
    const formData = new FormData();
    formData.append('file', this.uploadFile, this.uploadFile.name);
    this.uploadProgress = 0;

    this.fileUploadService.uploadEbook(this.uploadBookId, formData).subscribe({
      next: (event: any) => {
        if (event.type === HttpEventType.UploadProgress) {
          this.uploadProgress = Math.round(100 * event.loaded / (event.total || 1));
        } else if (event.type === HttpEventType.Response) {
          this.uploadProgress = null;
          this.uploadFile = null;
          super.show('Success', 'PDF uploaded successfully.', 'success');
          this._loadData();
        }
      },
      error: (e: HttpErrorResponse) => {
        this.uploadProgress = null;
        super.show('Error', e.message, 'error');
      },
    });
  }

  saveExternalLink(): void {
    if (!this.uploadBookId || !this.uploadLink.trim()) {
      super.show('Validation', 'Select a catalog item and enter a URL.', 'warning');
      return;
    }
    if (!this.uploadLink.startsWith('https://')) {
      super.show('Validation', 'URL must start with https://', 'warning');
      return;
    }
    this.uploadSaving = true;
    // Save via PUT /book/update/{id} pattern — use httpService.put or direct http call
    const username = localStorage.getItem('username') || '';
    const password = localStorage.getItem('password') || '';
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(username + ':' + password),
      'Content-Type': 'application/json',
    });
    const book = this.allBooks.find(b => b.id === this.uploadBookId);
    if (!book) { this.uploadSaving = false; return; }
    const payload = { ...book, link: this.uploadLink.trim() };
    this.http.put(`${CONFIG.URL_BASE}/book/update/${this.uploadBookId}`, payload, { headers })
      .subscribe({
        next: () => {
          this.uploadSaving = false;
          this.uploadLink = '';
          super.show('Success', 'External link saved.', 'success');
          this._loadData();
        },
        error: (e: HttpErrorResponse) => {
          this.uploadSaving = false;
          super.show('Error', e.message, 'error');
        },
      });
  }

  // ─── Cover URL ────────────────────────────────────────────────────────────

  coverUrl(book: CatalogItem): string {
    return book.photo
      ? `${CONFIG.URL_BASE}/book/image/${book.photo}`
      : 'assets/images/no-cover.png';
  }

  // ─── Helpers ──────────────────────────────────────────────────────────────

  /** Returns true if the current user's role meets the requirement */
  private _resolveAccess(level: 'public' | 'all' | 'member' | 'admin' | 'none'): boolean {
    if (level === 'none') return false;
    if (level === 'public' || level === 'all') return true;
    const isAdmin  = !!localStorage.getItem('username');
    const isMember = !!localStorage.getItem('opac_reader_id');
    if (level === 'admin')  return isAdmin;
    if (level === 'member') return isAdmin || isMember;
    return false;
  }

  viewAccessLabel(level: string): string {
    const map: Record<string, string> = {
      public: 'Everyone', member: 'Members', admin: 'Admin Only',
      all: 'Everyone', none: 'No Access',
    };
    return map[level] ?? level;
  }

  viewAccessBadge(id: number): string {
    const rule = this.getRuleFor(id);
    const cls: Record<string, string> = {
      public: 'ddm-badge--green', member: 'ddm-badge--blue',
      admin: 'ddm-badge--red',
    };
    return cls[rule.viewAccess] ?? 'ddm-badge--gray';
  }

  hasDoc(book: CatalogItem): boolean {
    return !!(book.pdf || book.link);
  }
}
