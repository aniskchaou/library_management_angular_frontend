import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as Chart from 'chart.js';
import { EventData } from 'ngx-event-calendar/lib/interface/event-data';
import { BehaviorSubject } from 'rxjs';
import { URLLoader } from 'src/app/main/configs/URLLoader';
import BookAnalytics from 'src/app/main/models/BookAnalytics';
import BookCategoryAnalytics from 'src/app/main/models/BookCategoryAnalytics';
import DashboardAnalytics from 'src/app/main/models/DashboardAnalytics';
import { AuthentificationService } from 'src/app/main/security/authentification.service';
import { HTTPService } from 'src/app/main/services/HTTPService';
import CONFIG from 'src/app/main/urls/urls';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent extends URLLoader implements OnInit {
  dashboardI18n;
  dashboardAnalytics;
  bookByAuthors: Object;
  bookByCategories: Object;
  expenses: Object;
  incomes: Object;
  loading = false;

  view1: any[] = [500, 380];
  view3: any[] = [500, 320];
  gradient: boolean = false;
  showLegend: boolean = true;
  showLabels: boolean = false;
  isDoughnut: boolean = false;
  legendPosition: string = 'below';
  view2: any[] = [1000, 400];
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Authors';
  xAxisLabelExpenses: string = 'Expenses';
  xAxisLabelIncomes: string = 'Incomes';
  yAxisLabelExpensesIncomes: string = 'Total ($)';
  showYAxisLabel: boolean = true;
  yAxisLabel: string = 'Books';
  legendTitle: string = 'Years';
  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA'],
  };
  colorSchemeExpenses = {
    domain: ['#A10A28', '#C7B42C', '#AAAAAA', '#5AA454'],
  };
  colorSchemeIncomes = {
    domain: ['#C7B42C', '#AAAAAA', '#5AA454', '#A10A28'],
  };
  constructor(
    private httpService: HTTPService,
    private router: Router,
    private authService: AuthentificationService
  ) {
    super();
  }

  ngOnInit(): void {
    super.loadScripts();
    this.httpService.dashboardI18n$.subscribe((data) => {
      this.dashboardI18n = data;
    });
    this.getBooksByAuthors();
    this.getBooksByCategories();
    this.getExpenses();
    this.getIncomes();
    this.getAnalyticsNumbers();
  }

  getAnalyticsNumbers() {
    this.loading = true;
    this.httpService
      .getAll(CONFIG.URL_BASE + '/analytics/shortanalytics/')
      .subscribe(
        (data) => {
          this.dashboardAnalytics = data;
          this.loading = false;
        },
        (err: HttpErrorResponse) => {}
      );
  }
  getExpenses() {
    this.loading = true;
    this.httpService.getAll(CONFIG.URL_BASE + '/analytics/expenses/').subscribe(
      (data) => {
        this.expenses = data;
        this.loading = false;
      },
      (err: HttpErrorResponse) => {}
    );
  }

  getIncomes() {
    this.loading = true;
    this.httpService.getAll(CONFIG.URL_BASE + '/analytics/incomes/').subscribe(
      (data) => {
        this.incomes = data;
        this.loading = false;
      },
      (err: HttpErrorResponse) => {}
    );
  }

  getBooksByCategories() {
    this.loading = true;
    this.httpService
      .getAll(CONFIG.URL_BASE + '/analytics/bookbycategory/')
      .subscribe(
        (data) => {
          this.bookByCategories = data;
          this.loading = false;
        },
        (err: HttpErrorResponse) => {}
      );
  }

  getBooksByAuthors() {
    this.loading = true;
    this.httpService
      .getAll(CONFIG.URL_BASE + '/analytics/bookbyauthor/')
      .subscribe(
        (data) => {
          this.bookByAuthors = data;
          this.loading = false;
        },
        (err: HttpErrorResponse) => {}
      );
  }

  onSelect(data): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

  selectDay(event) {
    console.log(event);
  }
  addEvent(event) {}
}
