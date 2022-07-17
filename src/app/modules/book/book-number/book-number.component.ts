import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { URLLoader } from 'src/app/main/configs/URLLoader';
import DashboardAnalytics from 'src/app/main/models/DashboardAnalytics';
import { HTTPService } from 'src/app/main/services/HTTPService';
import CONFIG from 'src/app/main/urls/urls';

@Component({
  selector: 'app-book-number',
  templateUrl: './book-number.component.html',
  styleUrls: ['./book-number.component.css'],
})
export class BookNumberComponent extends URLLoader implements OnInit {
  dashboardAnalytics;
  dashboardI18n;
  constructor(private httpService: HTTPService) {
    super();
  }

  ngOnInit(): void {
    this.getAnalyticsNumbers();
    this.httpService.dashboardI18n$.subscribe((data) => {
      this.dashboardI18n = data;
    });
  }

  getAnalyticsNumbers() {
    this.httpService
      .getAll(CONFIG.URL_BASE + '/analytics/shortanalytics/')
      .subscribe(
        (data) => {
          this.dashboardAnalytics = data;
        },
        (err: HttpErrorResponse) => {}
      );
  }
}
