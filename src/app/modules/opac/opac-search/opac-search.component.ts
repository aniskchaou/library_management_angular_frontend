import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import CatalogItem from 'src/app/main/models/Book';
import Category from 'src/app/main/models/Category';
import { MediaType } from 'src/app/modules/dashboard/dashboard/dashboard.component';
import CONFIG from 'src/app/main/urls/urls';
import { OpacAuthService } from '../opac-auth.service';
import { OpacDetailComponent } from '../opac-detail/opac-detail.component';

type ViewMode = 'grid' | 'list';

@Component({
  selector: 'app-opac-search',
  templateUrl: './opac-search.component.html',
  styleUrls: ['./opac-search.component.css'],
  standalone: false,
})
export class OpacSearchComponent implements OnInit {

  // ─── State ────────────────────────────────────────────────────────────────
  allItems: CatalogItem[] = [];
  filtered: CatalogItem[] = [];
  displayed: CatalogItem[] = [];
  loading = false;

  // ─── Filters ──────────────────────────────────────────────────────────────
  query        = '';
  filterCat    = '';
  filterDdc    = '';
  filterLang   = '';
  filterType   = '';
  filterYear   = '';
  quickFilter  = 'all';    // 'all' | 'new' | 'ebook' | 'available' | 'popular' | 'audio'

  // Map of bookId → borrow count (from circulation top-borrowers, populated lazily)
  private _borrowCounts = new Map<number, number>();
  private _borrowCountsLoaded = false;

  // ─── Pagination ───────────────────────────────────────────────────────────
  page        = 1;
  pageSize    = 24;
  totalPages  = 1;

  // ─── UI ───────────────────────────────────────────────────────────────────
  viewMode: ViewMode = 'grid';

  // ─── Reference data ───────────────────────────────────────────────────────
  categories: Category[]  = [];
  mediaTypes: any[]        = [];

  readonly ddcClasses = [
    { prefix: '0', label: '000 – General & CS' },
    { prefix: '1', label: '100 – Philosophy' },
    { prefix: '2', label: '200 – Religion' },
    { prefix: '3', label: '300 – Social Sciences' },
    { prefix: '4', label: '400 – Language' },
    { prefix: '5', label: '500 – Natural Sciences' },
    { prefix: '6', label: '600 – Technology' },
    { prefix: '7', label: '700 – Arts' },
    { prefix: '8', label: '800 – Literature' },
    { prefix: '9', label: '900 – History' },
  ];

  readonly langOptions = [
    { code: 'eng', label: 'English' },
    { code: 'vie', label: 'Vietnamese' },
    { code: 'fre', label: 'French' },
    { code: 'ger', label: 'German' },
    { code: 'spa', label: 'Spanish' },
    { code: 'chi', label: 'Chinese' },
    { code: 'jpn', label: 'Japanese' },
    { code: 'kor', label: 'Korean' },
    { code: 'rus', label: 'Russian' },
    { code: 'ara', label: 'Arabic' },
  ];

  constructor(
    private http: HttpClient,
    private modal: NgbModal,
    public auth: OpacAuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.load();
    this.loadFilters();
  }

  // ─── Data loading ─────────────────────────────────────────────────────────

  load(): void {
    this.loading = true;
    this.http.get<CatalogItem[]>(`${CONFIG.URL_BASE}/book/all`).subscribe({
      next: items => {
        this.allItems = items || [];
        this.applyFilters();
        this.loading = false;
      },
      error: () => { this.loading = false; },
    });
  }

  loadFilters(): void {
    this.http.get<Category[]>(`${CONFIG.URL_BASE}/category/all`)
      .subscribe({ next: cats => this.categories = cats || [], error: () => {} });
    this.http.get<any[]>(`${CONFIG.URL_BASE}/mediatype/all`)
      .subscribe({ next: mt => this.mediaTypes = mt || [], error: () => {} });
    // Pre-load borrow counts for "popular" filter
    this.http.get<any[]>(`${CONFIG.URL_BASE}/circulation/top-borrowers?limit=50`)
      .subscribe({
        next: rows => {
          (rows || []).forEach((r: any) => {
            if (r.bookId) this._borrowCounts.set(Number(r.bookId), r.borrowCount ?? 0);
          });
          this._borrowCountsLoaded = true;
          if (this.quickFilter === 'popular') this.applyFilters();
        },
        error: () => { this._borrowCountsLoaded = true; }
      });
  }

  // ─── Filtering ────────────────────────────────────────────────────────────

  applyFilters(): void {
    const q = this.query.trim().toLowerCase();

    let result = this.allItems.filter(item => {
      if (q) {
        const haystack = [
          item.title, item.subtitle, item.isbn,
          item.writer?.name, item.publisher?.name,
          item.marc_650, item.marc_001, item.call_no,
        ].filter(Boolean).join(' ').toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      if (this.filterCat && item.category?.id?.toString() !== this.filterCat) return false;
      if (this.filterDdc && !(item.marc_082 || '').startsWith(this.filterDdc)) return false;
      if (this.filterLang && item.marc_041 !== this.filterLang) return false;
      if (this.filterType && item.mediaType?.id?.toString() !== this.filterType) return false;
      if (this.filterYear && item.publishing_year !== this.filterYear) return false;

      if (this.quickFilter === 'new') {
        const year = parseInt(item.publishing_year || '0', 10);
        if (year < new Date().getFullYear() - 2) return false;
      }
      if (this.quickFilter === 'ebook') {
        if (!item.pdf && !item.link && !item.marc_856) return false;
      }
      if (this.quickFilter === 'available') {
        if (!item.number_of_books || Number(item.number_of_books) < 1) return false;
      }
      if (this.quickFilter === 'popular') {
        // Must appear in borrow counts map (i.e., has been borrowed at least once)
        if (!this._borrowCounts.has(Number(item.id))) return false;
      }
      if (this.quickFilter === 'audio') {
        // Audio books: mediaType name contains "audio", or marc_347 / notes contains "audio"
        const mt = (item.mediaType as any)?.name ?? (item.mediaType as any)?.type ?? '';
        const notes = (item as any).notes ?? '';
        const marc347 = (item as any).marc_347 ?? '';
        if (!mt.toLowerCase().includes('audio') &&
            !notes.toLowerCase().includes('audio') &&
            !marc347.toLowerCase().includes('audio')) return false;
      }
      return true;
    });

    // For "popular" filter — sort by borrow count descending
    if (this.quickFilter === 'popular') {
      result = result.sort((a, b) =>
        (this._borrowCounts.get(Number(b.id)) ?? 0) - (this._borrowCounts.get(Number(a.id)) ?? 0)
      );
    }

    this.filtered    = result;
    this.totalPages  = Math.max(1, Math.ceil(result.length / this.pageSize));
    this.page        = 1;
    this._slicePage();
  }

  onSearch(): void { this.applyFilters(); }
  onFilterChange(): void { this.applyFilters(); }

  setQuickFilter(f: string): void {
    this.quickFilter = f;
    this.applyFilters();
  }

  clearFilters(): void {
    this.query      = '';
    this.filterCat  = '';
    this.filterDdc  = '';
    this.filterLang = '';
    this.filterType = '';
    this.filterYear = '';
    this.quickFilter = 'all';
    this.applyFilters();
  }

  // ─── Pagination ───────────────────────────────────────────────────────────

  goPage(p: number): void {
    if (p < 1 || p > this.totalPages) return;
    this.page = p;
    this._slicePage();
  }

  private _slicePage(): void {
    const start = (this.page - 1) * this.pageSize;
    this.displayed = this.filtered.slice(start, start + this.pageSize);
  }

  pageNumbers(): number[] {
    const total = this.totalPages;
    if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
    if (this.page <= 4) return [1, 2, 3, 4, 5, -1, total];
    if (this.page >= total - 3) return [1, -1, total - 4, total - 3, total - 2, total - 1, total];
    return [1, -1, this.page - 1, this.page, this.page + 1, -1, total];
  }

  // ─── Item helpers ─────────────────────────────────────────────────────────

  coverUrl(item: CatalogItem): string {
    if (item.photo) return `${CONFIG.URL_BASE}/book/image/${item.photo}`;
    return 'assets/images/no-cover.png';
  }

  hasDigital(item: CatalogItem): boolean {
    return !!(item.pdf || item.link || item.marc_856);
  }

  ddcLabel(item: CatalogItem): string {
    if (!item.marc_082) return '';
    const cls = this.ddcClasses.find(c => item.marc_082.startsWith(c.prefix));
    return cls ? `${item.marc_082} · ${cls.label.split(' – ')[1]}` : item.marc_082;
  }

  availabilityClass(item: CatalogItem): string {
    const n = Number(item.number_of_books || 0);
    if (n <= 0) return 'opac-avail--none';
    if (n === 1) return 'opac-avail--low';
    return 'opac-avail--ok';
  }

  availabilityLabel(item: CatalogItem): string {
    const n = Number(item.number_of_books || 0);
    if (n <= 0) return 'Not available';
    if (n === 1) return '1 copy';
    return `${n} copies`;
  }

  // ─── View detail ─────────────────────────────────────────────────────────

  openDetail(item: CatalogItem): void {
    const ref = this.modal.open(OpacDetailComponent, {
      size: 'xl',
      centered: true,
      windowClass: 'opac-detail-modal',
    });
    ref.componentInstance.item = item;
    ref.componentInstance.auth = this.auth;
  }

  goToAccount(): void {
    this.router.navigate(['/opac-account']);
  }
}
