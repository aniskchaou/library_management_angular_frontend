import { Component, OnInit } from '@angular/core';
import { HTTPService } from 'src/app/main/services/HTTPService';
import CONFIG from 'src/app/main/urls/urls';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ViewBookComponent } from '../view-book/view-book.component';

@Component({
    selector: 'app-advanced-search',
    templateUrl: './advanced-search.component.html',
    styleUrls: ['./advanced-search.component.css'],
    standalone: false
})
export class AdvancedSearchComponent implements OnInit {
  query = '';
  searchBy: 'title' | 'author' | 'category' = 'title';
  results: any[] = [];
  loading = false;
  searched = false;

  constructor(private httpService: HTTPService, private modalService: NgbModal) {}

  ngOnInit(): void {}

  search(): void {
    const term = this.query.trim();
    if (!term) return;
    this.loading = true;
    this.searched = false;
    const url = this.searchBy === 'title'
      ? `${CONFIG.URL_BASE}/search/book/${encodeURIComponent(term)}`
      : this.searchBy === 'author'
        ? `${CONFIG.URL_BASE}/search/writer/${encodeURIComponent(term)}`
        : `${CONFIG.URL_BASE}/search/category/${encodeURIComponent(term)}`;

    this.httpService.getAll(url).subscribe({
      next: (data: any[]) => {
        this.results = data || [];
        this.loading = false;
        this.searched = true;
      },
      error: () => {
        this.results = [];
        this.loading = false;
        this.searched = true;
      }
    });
  }

  viewBook(book: any): void {
    const ref = this.modalService.open(ViewBookComponent, { size: 'lg' });
    ref.componentInstance.id = book.id;
    ref.componentInstance.book = book;
  }

  onKeydown(e: KeyboardEvent): void {
    if (e.key === 'Enter') this.search();
  }
}
