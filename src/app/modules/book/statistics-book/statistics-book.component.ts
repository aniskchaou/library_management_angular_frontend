import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { URLLoader } from 'src/app/main/configs/URLLoader';
import Book from 'src/app/main/models/Book';
import { HTTPService } from 'src/app/main/services/HTTPService';
import CONFIG from 'src/app/main/urls/urls';
import BookFilterValidation from 'src/app/main/validations/BookFilterValidation';

@Component({
  selector: 'app-statistics-book',
  templateUrl: './statistics-book.component.html',
  styleUrls: ['./statistics-book.component.css'],
})
export class StatisticsBookComponent extends URLLoader implements OnInit {
  showsummary: boolean = false;
  showgraphic: boolean = false;
  showfilter: boolean = false;
  filterForm: FormGroup;
  submitted: boolean = false;
  @Output() result = new EventEmitter();
  @Output() groupByAuthors = new EventEmitter();
  @Output() groupByPublishers = new EventEmitter();
  @Output() getAll = new EventEmitter();
  @Output() groupByCategories = new EventEmitter();
  @Output() groupByEditionYears = new EventEmitter();
  @Output() filterByYears = new EventEmitter();
  @Output() filterByWriters = new EventEmitter();
  @Output() filterByCategories = new EventEmitter();
  @Input() bookI18n;
  categories;
  writers;

  constructor(
    private router: Router,
    private validation: BookFilterValidation,
    private httpService: HTTPService
  ) {
    super();
    this.filterForm = this.validation.formGroupInstance;
    for (let index = 2018; index < 2022; index++) {
      this.years.push(index);
    }
  }

  years = [];

  ngOnInit(): void {
    this.getCategories();
    this.getWriters();
  }

  get f() {
    return this.filterForm.controls;
  }

  reloadPage() {
    this.router
      .navigateByUrl('/dashboard', { skipLocationChange: true })
      .then(() => {
        this.router.navigate(['/book']);
      });
  }

  add() {
    this.submitted = true;
    this.httpService
      .get(
        CONFIG.URL_BASE +
          '/book/filter/' +
          this.filterForm.value.edition_year +
          '/' +
          this.filterForm.value.publishing_year +
          '/' +
          this.filterForm.value.publishing_place +
          '/' +
          this.filterForm.value.number_of_pages
      )
      .subscribe((data: Book) => {
        console.log(data);
        this.result.emit(data);
        this.showfilter = false;
      });
  }

  groupByAuthor() {
    this.groupByAuthors.emit();
  }

  groupByPublisher() {
    this.groupByPublishers.emit();
  }
  groupByEditionYear() {
    this.groupByEditionYears.emit();
  }
  groupByCategory() {
    this.groupByEditionYears.emit();
  }

  getBooks() {
    this.getAll.emit();
  }

  getCategories() {
    this.httpService.getAll(CONFIG.URL_BASE + '/category/all').subscribe(
      (data) => {
        this.categories = data;
      },
      (err: HttpErrorResponse) => {
        //super.show('Error', err.message, 'warning');
      }
    );
  }

  getWriters() {
    this.httpService.getAll(CONFIG.URL_BASE + '/writer/all').subscribe(
      (data) => {
        this.writers = data;
      },
      (err: HttpErrorResponse) => {
        //super.show('Error', err.message, 'warning');
      }
    );
  }

  filterByWriter(writer) {
    this.filterByWriters.emit(writer);
  }

  filterByCategory(category) {
    this.filterByCategories.emit(category);
  }

  filterByYear(year) {
    this.filterByYears.emit(year);
  }
}
