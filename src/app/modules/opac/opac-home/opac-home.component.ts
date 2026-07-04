import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import CONFIG from 'src/app/main/urls/urls';
import { OpacAuthService } from '../opac-auth.service';
import Category from 'src/app/main/models/Category';
import CatalogItem from 'src/app/main/models/Book';

@Component({
  selector: 'app-opac-home',
  templateUrl: './opac-home.component.html',
  styleUrls: ['./opac-home.component.css'],
  standalone: false,
})
export class OpacHomeComponent implements OnInit {

  // ── Hero search ──────────────────────────────────────────────────────────
  heroQuery = '';
  today = new Date();

  // ── Stats ────────────────────────────────────────────────────────────────
  totalBooks     = 0;
  totalMembers   = 0;
  totalCategories = 0;
  totalEbooks    = 0;

  // ── Data ─────────────────────────────────────────────────────────────────
  categories: Category[]  = [];
  newArrivals: CatalogItem[] = [];
  featuredBooks: CatalogItem[] = [];

  loading = false;

  readonly categoryIcons: Record<string, string> = {
    'science':     'science',
    'history':     'history_edu',
    'literature':  'auto_stories',
    'technology':  'computer',
    'art':         'palette',
    'medicine':    'medical_services',
    'law':         'gavel',
    'economics':   'bar_chart',
    'philosophy':  'psychology',
    'religion':    'church',
    'language':    'translate',
    'education':   'school',
    'geography':   'public',
    'sports':      'sports',
    'children':    'child_care',
  };

  constructor(
    public auth: OpacAuthService,
    private http: HttpClient,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this._loadStats();
    this._loadCategories();
    this._loadNewArrivals();
  }

  // ── Navigation ───────────────────────────────────────────────────────────
  goSearch(): void {
    this.router.navigate(['/opac'], this.heroQuery ? { queryParams: { q: this.heroQuery } } : {});
  }

  goSearchWithCategory(catName: string): void {
    this.router.navigate(['/opac'], { queryParams: { cat: catName } });
  }

  catName(cat: Category): string {
    return cat.categoryName || '';
  }

  goAccount(): void {
    this.router.navigate(['/login']);
  }

  goAdminLogin(): void {
    this.router.navigate(['/login']);
  }

  iconFor(cat: Category): string {
    const key = (cat.categoryName || '').toLowerCase();
    for (const [k, icon] of Object.entries(this.categoryIcons)) {
      if (key.includes(k)) return icon;
    }
    return 'category';
  }

  // ── Auth header (admin:admin — read-only public data access) ─────────────
  private get _authHeaders(): { headers: HttpHeaders } {
    return { headers: new HttpHeaders({ Authorization: 'Basic ' + btoa('admin:admin') }) };
  }

  // ── Data loading ─────────────────────────────────────────────────────────
  private _loadStats(): void {
    this.http.get<any>(CONFIG.URL_BASE + '/dashboard', this._authHeaders).subscribe({
      next: (d) => {
        this.totalBooks      = d?.bookNumber      ?? 0;
        this.totalMembers    = d?.memberNumber     ?? 0;
        this.totalCategories = d?.categoryNumber   ?? 0;
        this.totalEbooks     = d?.issueBookNumber  ?? 0;
      },
      error: () => { /* silently ignore — stats are decorative */ }
    });
  }

  private _loadCategories(): void {
    this.http.get<Category[]>(CONFIG.URL_BASE + '/category/all', this._authHeaders).subscribe({
      next: (cats) => { this.categories = (cats || []).slice(0, 12); },
      error: () => {}
    });
  }

  private _loadNewArrivals(): void {
    this.http.get<CatalogItem[]>(CONFIG.URL_BASE + '/book/all', this._authHeaders).subscribe({
      next: (books) => {
        const sorted = (books || [])
          .sort((a: any, b: any) => (b.id ?? 0) - (a.id ?? 0));
        this.newArrivals   = sorted.slice(0, 8);
        this.featuredBooks = sorted.slice(8, 12);
      },
      error: () => {}
    });
  }

  coverUrl(book: CatalogItem): string {
    if ((book as any)?.photo) return `${CONFIG.URL_BASE}/book/image/${(book as any).photo}`;
    return 'assets/images/no-cover.png';
  }
}
