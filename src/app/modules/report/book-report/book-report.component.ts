import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { URLLoader } from 'src/app/main/configs/URLLoader';
import CatalogItem from 'src/app/main/models/Book';
import Category from 'src/app/main/models/Category';
import Publisher from 'src/app/main/models/Publisher';
import Writer from 'src/app/main/models/Writer';
import { HTTPService } from 'src/app/main/services/HTTPService';
import CONFIG from 'src/app/main/urls/urls';
import { saveAs } from 'file-saver';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
@Component({
  selector: 'app-book-report',
  templateUrl: './book-report.component.html',
  styleUrls: ['./book-report.component.css'],
})
export class BookReportComponent extends URLLoader implements OnInit {
  books$: CatalogItem[];
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
    this.populateYears();
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
  getAll() {
    // this.loading = true;
    this.httpService
      .getAll(CONFIG.URL_BASE + '/book/all')
      .pipe(finalize(() => (this.loading = false)))
      .subscribe(
        (data: CatalogItem[]) => {
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

  years: Array<{ year: number }> = [];



  populateYears() {
    const currentYear = new Date().getFullYear();
    for (let year = 1910; year <= currentYear; year++) {
      this.years.push({ year });
    }
  }

  search() {
    this.searchButtonClicked = true;
    //  this.loading = true;
    this.loadScripts();
    console.log(  CONFIG.URL_BASE +
      '/book/bookreport/' +
      this.selectedYear +
      '/' +
      this.selectedWriter +
      '/' +
      this.selectedPublisher +
      '/' +
      this.selectedCategory)
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
        (data: CatalogItem[]) => {
          this.books$ = data;
          //this.loading = false;
        },
        (err: HttpErrorResponse) => {
          super.show('Error', err.message, 'warning');
        }
      );
  }
  exportToCSV() {
    const rows = this.books$.map(book => ({
      ISBN: book.isbn,
      Title: book.title,
      Author: book.writer?.name,
      Category: book.category?.categoryName,
      Publisher: book.publisher?.name,
    }));

    const csvContent = [
      ['ISBN', 'Title', 'Author', 'Category', 'Publisher'], // Header row
      ...rows.map(row => Object.values(row)) // Data rows
    ]
      .map(e => e.join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, 'books.csv');
  }

  exportToPDF() {
    const doc = new jsPDF();
    const headers = [['ISBN', 'Title', 'Author', 'Category', 'Publisher']];
    const rows  = this.books$.map(book => [
      book.isbn,
      book.title,
      book.writer?.name,
      book.category?.categoryName,
      book.publisher?.name
    ]);

    doc.text('Books List', 14, 16);
      // Set column widths
  const colWidths = [40, 30, 50, 30, 60];

  // Draw the table headers
  let x = 14;
  let y = 20;

  headers.forEach((header, index) => {
    doc.text(header, x + colWidths[index] / 2, y);
    x += colWidths[index];
  });

  y += 10; // Move down to start drawing the rows

  // Draw the rows
  rows.forEach(row => {
    x = 14;
    row.forEach((cell, index) => {
      doc.text(cell, x + colWidths[index] / 2, y);
      x += colWidths[index];
    });
    y += 10;
  });
    doc.save('books.pdf');
  }
}
