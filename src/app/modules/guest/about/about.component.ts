import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import CONFIG from 'src/app/main/urls/urls';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
  standalone: false,
})
export class AboutComponent implements OnInit {
  libraryName  = 'Library Lab';
  address      = '';
  telephone    = '';
  fax          = '';

  stats = { books: 0, members: 0, categories: 0, ebooks: 0 };

  features = [
    { icon: 'search',          title: 'Online Catalog (OPAC)',     desc: 'Search our full collection anytime, anywhere, on any device.' },
    { icon: 'auto_stories',    title: 'Digital Library',           desc: 'Access e-books, audiobooks and digital documents online.' },
    { icon: 'swap_horiz',      title: 'Easy Borrowing & Returns',  desc: 'Check out, renew and return items with minimal friction.' },
    { icon: 'notifications',   title: 'Automated Reminders',       desc: 'Email reminders before due dates so you never pay a fine.' },
    { icon: 'people',          title: 'Member Self-Service',       desc: 'Manage loans, holds, payments and your reading history online.' },
    { icon: 'language',        title: 'Multi-Language',            desc: 'The portal is available in multiple languages.' },
  ];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    const base = CONFIG.URL_BASE;
    this.http.get<any[]>(base + '/settings/all').subscribe({
      next: list => {
        const s = Array.isArray(list) ? list[0] : list;
        if (s) {
          this.libraryName = s.name  || this.libraryName;
          this.address     = s.address   || '';
          this.telephone   = s.telephone || '';
          this.fax         = s.fax       || '';
        }
      }, error: () => {},
    });

    this.http.get<any[]>(base + '/book/all').subscribe({
      next: d => this.stats.books = Array.isArray(d) ? d.length : 0, error: () => {},
    });
    this.http.get<any[]>(base + '/member/all').subscribe({
      next: d => this.stats.members = Array.isArray(d) ? d.length : 0, error: () => {},
    });
    this.http.get<any[]>(base + '/category/all').subscribe({
      next: d => this.stats.categories = Array.isArray(d) ? d.length : 0, error: () => {},
    });
    this.http.get<any[]>(base + '/ebook/all').subscribe({
      next: d => this.stats.ebooks = Array.isArray(d) ? d.length : 0, error: () => {},
    });
  }
}
