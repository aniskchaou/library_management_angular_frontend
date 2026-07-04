import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import CONFIG from 'src/app/main/urls/urls';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.css'],
  standalone: false,
})
export class BrowseComponent implements OnInit {
  categories: any[]    = [];
  allBooks: any[]      = [];
  booksInCategory: any[] = [];
  selectedCat: any     = null;
  loading = true;
  loadingBooks = false;
  searchQuery = '';
  sortBy: 'title' | 'year' | 'author' = 'title';

  readonly CATEGORY_ICONS: Record<string, string> = {
    Science: 'science', Technology: 'computer', History: 'history_edu',
    Literature: 'auto_stories', Mathematics: 'functions', Philosophy: 'psychology',
    Art: 'palette', Music: 'music_note', Religion: 'church',
    Geography: 'public', Law: 'gavel', Medicine: 'local_hospital',
    Economics: 'trending_up', Politics: 'account_balance', Children: 'child_care',
    Default: 'menu_book',
  };

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.http.get<any[]>(CONFIG.URL_BASE + '/category/all').subscribe({
      next: cats => { this.categories = cats || []; this.loading = false; },
      error: () => { this.loading = false; },
    });
  }

  selectCategory(cat: any): void {
    this.selectedCat = cat;
    this.searchQuery = '';
    this.loadingBooks = true;
    this.http.get<any[]>(CONFIG.URL_BASE + '/book/all').subscribe({
      next: books => {
        this.allBooks = (books || []).filter(b =>
          b.category?.id === cat.id || b.category?.category_name === cat.category_name);
        this.applySort();
        this.loadingBooks = false;
      },
      error: () => { this.loadingBooks = false; },
    });
  }

  applySort(): void {
    const q = this.searchQuery.toLowerCase();
    let list = this.allBooks.filter(b =>
      !q || b.title?.toLowerCase().includes(q) || b.writer?.name?.toLowerCase().includes(q));
    list = list.slice().sort((a, b) => {
      if (this.sortBy === 'title')  return (a.title || '').localeCompare(b.title || '');
      if (this.sortBy === 'year')   return (b.publishing_year || 0) - (a.publishing_year || 0);
      if (this.sortBy === 'author') return (a.writer?.name || '').localeCompare(b.writer?.name || '');
      return 0;
    });
    this.booksInCategory = list;
  }

  iconForCat(name: string): string {
    for (const key of Object.keys(this.CATEGORY_ICONS)) {
      if (name?.toLowerCase().includes(key.toLowerCase())) return this.CATEGORY_ICONS[key];
    }
    return this.CATEGORY_ICONS['Default'];
  }

  openBook(b: any): void {
    this.router.navigate(['/opac'], { queryParams: { q: b.title } });
  }

  coverUrl(b: any): string {
    if (b.photo) return CONFIG.URL_BASE + '/book/image/' + b.photo;
    return 'assets/images/no-cover.png';
  }
}
