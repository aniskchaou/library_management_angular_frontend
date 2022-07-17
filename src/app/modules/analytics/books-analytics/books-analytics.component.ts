import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Analytics } from 'src/app/main/models/Analytics';
import { HTTPService } from 'src/app/main/services/HTTPService';
import CONFIG from 'src/app/main/urls/urls';

@Component({
  selector: 'app-books-analytics',
  templateUrl: './books-analytics.component.html',
  styleUrls: ['./books-analytics.component.css'],
})
export class BooksAnalyticsComponent implements OnInit {
  data;
  bookByCategories;
  bookByAuthors;
  bookByPublishers;
  menu;
  single: any[];
  multi: any[];
  view: any[] = [900, 350];
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel1 = 'Categories';
  xAxisLabel2 = 'Authors';
  xAxisLabel3 = 'Publishers';
  showYAxisLabel = true;
  yAxisLabel = 'Books';
  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA'],
  };
  ngOnInit(): void {
    this.httpService.menuI18n$.subscribe((data) => {
      this.menu = data;
    });
  }

  onSelect(event) {
    console.log(event);
  }

  constructor(private httpService: HTTPService) {
    this.httpService
      .getAll(CONFIG.URL_BASE + '/analytics/bookbycategory/')
      .subscribe(
        (data) => {
          this.bookByCategories = data;
        },
        (err: HttpErrorResponse) => {}
      );

    this.httpService
      .getAll(CONFIG.URL_BASE + '/analytics/bookbyauthor/')
      .subscribe(
        (data) => {
          this.bookByAuthors = data;
        },
        (err: HttpErrorResponse) => {}
      );

    this.httpService
      .getAll(CONFIG.URL_BASE + '/analytics/bookbypublisher/')
      .subscribe(
        (data) => {
          this.bookByPublishers = data;
        },
        (err: HttpErrorResponse) => {}
      );
  }
}
