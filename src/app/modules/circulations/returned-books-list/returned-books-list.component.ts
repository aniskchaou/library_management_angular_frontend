import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { URLLoader } from 'src/app/main/configs/URLLoader';
import Circulation from 'src/app/main/models/Circulation';
import { HTTPService } from 'src/app/main/services/HTTPService';
import CONFIG from 'src/app/main/urls/urls';

@Component({
    selector: 'app-returned-books-list',
    templateUrl: './returned-books-list.component.html',
    styleUrls: ['./returned-books-list.component.css'],
    standalone: false
})
export class ReturnedBooksListComponent extends URLLoader implements OnInit {
  rows: Circulation[] = [];
  private allRows: Circulation[] = [];
  loading = false;

  constructor(private httpService: HTTPService) {
    super();
  }

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.loading = true;
    this.httpService.getAll(CONFIG.URL_BASE + '/circulation/returned').subscribe(
      (data: Circulation[]) => {
        this.allRows = data;
        this.rows = data;
        this.loading = false;
      },
      (err: HttpErrorResponse) => {
        super.show('Error', err.message, 'warning');
        this.loading = false;
      }
    );
  }

  updateFilter(event: Event): void {
    const val = (event.target as HTMLInputElement).value.toLowerCase();
    this.rows = val
      ? this.allRows.filter(d => d.catalogItemName?.title?.toLowerCase().includes(val))
      : this.allRows;
  }
}
