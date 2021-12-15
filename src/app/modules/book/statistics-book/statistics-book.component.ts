import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
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
  @Input() bookI18n;

  constructor(
    private router: Router,
    private validation: BookFilterValidation,
    private httpService: HTTPService
  ) {
    super();
    this.filterForm = this.validation.formGroupInstance;
  }

  ngOnInit(): void {}

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
}
