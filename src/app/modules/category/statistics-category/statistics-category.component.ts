import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import Book from 'src/app/main/models/Book';
import { HTTPService } from 'src/app/main/services/HTTPService';
import CONFIG from 'src/app/main/urls/urls';
import BookFilterValidation from 'src/app/main/validations/BookFilterValidation';

@Component({
  selector: 'app-statistics-category',
  templateUrl: './statistics-category.component.html',
  styleUrls: ['./statistics-category.component.css'],
})
export class StatisticsCategoryComponent implements OnInit {
  showsummary: boolean = false;
  showgraphic: boolean = false;
  showfilter: boolean = false;
  filterForm: FormGroup;
  submitted: boolean = false;
  @Output() result = new EventEmitter();
  @Input() categoryI18n;
  single: any[];
  multi: any[];
  data;
  view: any[] = [900, 350];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Categories';
  showYAxisLabel = true;
  yAxisLabel = 'Books';

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA'],
  };

  onSelect(event) {
    console.log(event);
  }
  constructor(
    private router: Router,
    private validation: BookFilterValidation,
    private httpService: HTTPService
  ) {}

  showChart() {
    this.showsummary = !this.showsummary;
    this.httpService
      .getAll(CONFIG.URL_BASE + '/analytics/bookbycategory/')
      .subscribe(
        (data) => {
          this.data = data;
        },
        (err: HttpErrorResponse) => {}
      );
  }

  ngOnInit(): void {
    this.httpService
      .getAll(CONFIG.URL_BASE + '/analytics/bookbycategory/')
      .subscribe(
        (data) => {
          this.data = data;
        },
        (err: HttpErrorResponse) => {}
      );

    this.httpService
      .getAll(
        CONFIG.URL_BASE + '/i18n/category/' + CONFIG.getInstance().getLang()
      )
      .subscribe(
        (data) => {
          this.categoryI18n = data;
        },
        (err: HttpErrorResponse) => {}
      );
  }

  reloadPage() {
    this.router
      .navigateByUrl('/dashboard', { skipLocationChange: true })
      .then(() => {
        this.router.navigate(['/category']);
      });
  }
}
