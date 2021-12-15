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
  dashboardAnalytics: DashboardAnalytics;
  dashboardI18n;
  constructor(private httpService: HTTPService) {
    super();
  }

  ngOnInit(): void {
    this.getDashboardAnalytics();
    this.getDashboardByLang(CONFIG.LANG);
  }

  getDashboardByLang(lang) {
    this.httpService
      .getAll(CONFIG.URL_BASE + '/i18n/dashboard/' + lang)
      .subscribe(
        (data) => {
          this.dashboardI18n = data;
        },
        (err: HttpErrorResponse) => {
          super.show('Error', err.message, 'warning');
        }
      );
  }

  getDashboardAnalytics() {
    this.httpService
      .getAll(CONFIG.URL_BASE + '/analytics/dashboardanalytics')
      .subscribe(
        (data: DashboardAnalytics) => {
          this.dashboardAnalytics = data;
        },
        (err: HttpErrorResponse) => {
          super.show('Error', err.message, 'warning');
        }
      );
  }
}
