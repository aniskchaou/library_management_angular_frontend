import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { URLLoader } from 'src/app/main/configs/URLLoader';
import CatalogItem from 'src/app/main/models/Book';
import { HTTPService } from 'src/app/main/services/HTTPService';
import CONFIG from 'src/app/main/urls/urls';

@Component({
    selector: 'app-book-result-list',
    templateUrl: './book-result-list.component.html',
    styleUrls: ['./book-result-list.component.css'],
    standalone: false
})
export class BookResultListComponent extends URLLoader implements OnInit {
  @Input() word;
  bookI18n;
  loading = false;
  books: CatalogItem[];

  constructor(private httpService: HTTPService) {
    super();
  }

  ngOnInit(): void {
    //this.loadScripts();
    this.getBookByLang(CONFIG.getInstance().getLang());
    this.getBooks(this.word);
  }

  ngOnChanges() {
    this.getBookByLang(CONFIG.getInstance().getLang());
    this.getBooks(this.word);
  }
  getBookByLang(lang) {
     lang='EN'
    this.httpService.getAll(CONFIG.URL_BASE + '/i18n/book/' + lang).subscribe(
      (data) => {
        this.bookI18n = data;
      },
      (err: HttpErrorResponse) => {
        super.show('Error', err.message, 'warning');
      }
    );
  }

  getBooks(word) {
    this.loading = true;
    this.httpService.getAll(CONFIG.URL_BASE + '/search/book/' + word).subscribe(
      (data: CatalogItem[]) => {
        this.books = data;
        this.loading = false;
      },
      (err: HttpErrorResponse) => {
        super.show('Error', err.message, 'warning');
      }
    );
  }
}
