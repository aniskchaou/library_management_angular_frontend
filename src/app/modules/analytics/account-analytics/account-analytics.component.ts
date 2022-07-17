import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { HTTPService } from 'src/app/main/services/HTTPService';
import CONFIG from 'src/app/main/urls/urls';

@Component({
  selector: 'app-account-analytics',
  templateUrl: './account-analytics.component.html',
  styleUrls: ['./account-analytics.component.css'],
})
export class AccountAnalyticsComponent implements OnInit {
  expenses;
  incomes;
  menu;
  single: any[];
  multi: any[];
  view: any[] = [900, 350];
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Expense';
  xAxisLabel1 = 'Income';
  showYAxisLabel = true;
  yAxisLabel = 'Total';
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
    this.httpService.getAll(CONFIG.URL_BASE + '/analytics/expenses/').subscribe(
      (data) => {
        this.expenses = data;
      },
      (err: HttpErrorResponse) => {}
    );

    this.httpService.getAll(CONFIG.URL_BASE + '/analytics/incomes/').subscribe(
      (data) => {
        this.incomes = data;
      },
      (err: HttpErrorResponse) => {}
    );
  }
}
