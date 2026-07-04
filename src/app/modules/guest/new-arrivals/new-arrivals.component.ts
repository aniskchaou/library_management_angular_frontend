import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import CONFIG from 'src/app/main/urls/urls';

@Component({
  selector: 'app-new-arrivals',
  templateUrl: './new-arrivals.component.html',
  styleUrls: ['./new-arrivals.component.css'],
  standalone: false,
})
export class NewArrivalsComponent implements OnInit {
  books: any[]    = [];
  filtered: any[] = [];
  loading         = true;
  searchQuery     = '';
  selectedCategory = '';
  categories: string[] = [];

  // How many days back to consider "new"
  windowDays = 90;
  windowOptions = [30, 60, 90, 180, 365];

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void { this.load(); }

  load(): void {
    this.loading = true;
    this.http.get<any[]>(CONFIG.URL_BASE + '/book/all').subscribe({
      next: books => {
        const cutoff = new Date();
        cutoff.setDate(cutoff.getDate() - this.windowDays);
        this.books = (books || [])
          .filter(b => {
            if (!b.createdDate && !b.publishing_year) return true;
            const d = b.createdDate ? new Date(b.createdDate) : new Date(b.publishing_year + '-01-01');
            return d >= cutoff;
          })
          .sort((a, b) => {
            const da = a.createdDate ? new Date(a.createdDate).getTime() : 0;
            const db = b.createdDate ? new Date(b.createdDate).getTime() : 0;
            return db - da;
          });
        const cats = new Set<string>(this.books.map(b => b.category?.category_name).filter(Boolean));
        this.categories = Array.from(cats).sort();
        this.applyFilter();
        this.loading = false;
      },
      error: () => { this.loading = false; },
    });
  }

  applyFilter(): void {
    const q = this.searchQuery.toLowerCase();
    this.filtered = this.books.filter(b => {
      const matchSearch = !q ||
        b.title?.toLowerCase().includes(q) ||
        b.writer?.name?.toLowerCase().includes(q) ||
        b.isbn?.includes(q);
      const matchCat = !this.selectedCategory ||
        b.category?.category_name === this.selectedCategory;
      return matchSearch && matchCat;
    });
  }

  openDetail(book: any): void {
    // Navigate to the OPAC search with the title pre-filled for now
    this.router.navigate(['/opac'], { queryParams: { q: book.title } });
  }

  coverUrl(book: any): string {
    if (book.photo) return CONFIG.URL_BASE + '/book/image/' + book.photo;
    return 'assets/images/no-cover.png';
  }

  badgeDays(book: any): string {
    if (!book.createdDate) return '';
    const diff = Math.floor((Date.now() - new Date(book.createdDate).getTime()) / 86400000);
    if (diff <= 7)  return 'This week';
    if (diff <= 30) return 'This month';
    return '';
  }
}
