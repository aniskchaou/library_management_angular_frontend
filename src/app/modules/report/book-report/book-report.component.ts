import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { URLLoader } from 'src/app/main/configs/URLLoader';
import Book from 'src/app/main/models/Book';
import Category from 'src/app/main/models/Category';
import Publisher from 'src/app/main/models/Publisher';
import Writer from 'src/app/main/models/Writer';
import { HTTPService } from 'src/app/main/services/HTTPService';
import CONFIG from 'src/app/main/urls/urls';

@Component({
  selector: 'app-book-report',
  templateUrl: './book-report.component.html',
  styleUrls: ['./book-report.component.css'],
})
export class BookReportComponent extends URLLoader implements OnInit {
  books$: Book[];
  bookI18n: Object;
  loading: boolean = false;
  selectedYear;
  selectedPublisher;
  selectedWriter;
  selectedCategory;
  menu;
  searchButtonClicked: boolean = true;
  constructor(private httpService: HTTPService) {
    super();
  }
  writers$ = [];
  publishers$ = [];

  categories$ = [];
  ngOnInit(): void {
    this.searchButtonClicked = false;
    this.loadScripts();
    this.getcategories();
    this.getWriters();
    this.getPublishers();
    //this.getAll();
    this.getBookByLang(CONFIG.getInstance().getLang());
    this.httpService.menuI18n$.subscribe((data) => {
      this.menu = data;
    });
  }
  getBookByLang(lang) {
    this.httpService.getAll(CONFIG.URL_BASE + '/i18n/book/' + lang).subscribe(
      (data) => {
        this.bookI18n = data;
      },
      (err: HttpErrorResponse) => {
        super.show('Error', err.message, 'warning');
      }
    );
  }
  getAll() {
    // this.loading = true;
    this.httpService
      .getAll(CONFIG.URL_BASE + '/book/all')
      .pipe(finalize(() => (this.loading = false)))
      .subscribe(
        (data: Book[]) => {
          this.books$ = data;
          this.loading = false;
        },
        (err: HttpErrorResponse) => {
          super.show('Error', err.message, 'warning');
        }
      );
  }

  getcategories() {
    this.httpService.getAll(CONFIG.URL_BASE + '/category/all').subscribe(
      (data: Category[]) => {
        this.categories$ = data;
      },
      (err: HttpErrorResponse) => {
        super.show('Error', err.message, 'warning');
      }
    );
  }

  getWriters() {
    // this.appointements$ = this.appointmentTestService.getAll()
    this.httpService.getAll(CONFIG.URL_BASE + '/writer/all').subscribe(
      (data: Writer[]) => {
        this.writers$ = data;
        console.log(this.writers$);
      },
      (err: HttpErrorResponse) => {
        super.show('Error', err.message, 'error');
      }
    );
  }

  getPublishers() {
    // this.appointements$ = this.appointmentTestService.getAll()
    this.httpService.getAll(CONFIG.URL_BASE + '/publisher/all').subscribe(
      (data: Publisher[]) => {
        this.publishers$ = data;
        //console.log(this.publishers$);
      },
      (err: HttpErrorResponse) => {
        super.show('Error', err.message, 'error');
      }
    );
  }

  selectPublisher(publisher) {
    this.selectedPublisher = publisher;
  }
  selectYear(year) {
    this.selectedYear = year;
  }
  selectWriter(writer) {
    this.selectedWriter = writer;
  }
  selectCategory(category) {
    this.selectedCategory = category;
  }

  search() {
    this.searchButtonClicked = true;
    //  this.loading = true;
    this.loadScripts();
    this.httpService
      .getAll(
        CONFIG.URL_BASE +
          '/book/bookreport/' +
          this.selectedYear +
          '/' +
          this.selectedWriter +
          '/' +
          this.selectedPublisher +
          '/' +
          this.selectedCategory
      )
      .subscribe(
        (data: Book[]) => {
          this.books$ = data;
          //this.loading = false;
        },
        (err: HttpErrorResponse) => {
          super.show('Error', err.message, 'warning');
        }
      );
  }
}
