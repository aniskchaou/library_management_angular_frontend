import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import * as Chart from 'chart.js';
import { URLLoader } from 'src/app/main/configs/URLLoader';
import BookAnalytics from 'src/app/main/models/BookAnalytics';
import BookCategoryAnalytics from 'src/app/main/models/BookCategoryAnalytics';
import DashboardAnalytics from 'src/app/main/models/DashboardAnalytics';
import { HTTPService } from 'src/app/main/services/HTTPService';
import CONFIG from 'src/app/main/urls/urls';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent extends URLLoader implements OnInit {
  httpService: HTTPService;
  dashboardI18n;
  dashboardAnalytics;
  ngOnInit(): void {
    super.loadScripts();

    this.drawNumberBooksByDays();

    this.drawNumberBooksByCategory();

    this.getDashboardByLang(CONFIG.LANG);

    this.getDashboardAnalytics();
    /*super.show(
      'Library Lab',
      'cette application est en cours de développement.',
      'info'
    );*/
  }

  ngOnChanges() {
    this.drawNumberBooksByDays();

    this.drawNumberBooksByCategory();

    this.getDashboardByLang(CONFIG.LANG);

    this.getDashboardAnalytics();
  }

  getDashboardAnalytics() {
    this.httpService
      .getAll(CONFIG.URL_BASE + '/analytics/dashboardanalytics')
      .subscribe(
        (data: DashboardAnalytics) => {
          this.dashboardAnalytics = data;
          //console.log(this.circulationI18n);
          //document.getElementById('table').DataTable().ajax.reload();
        },
        (err: HttpErrorResponse) => {
          super.show('Error', err.message, 'error');
        }
      );
  }

  drawNumberBooksByCategory() {
    var ctx2 = document.getElementsByClassName('category-chart');

    this.httpService
      .getAll(CONFIG.URL_BASE + '/analytics/booksbycategory')
      .subscribe(
        (response: BookCategoryAnalytics) => {
          // this.menuI18n = data;
          //CONFIG.LANG = this.settings$.lang;
          //document.getElementById('table').DataTable().ajax.reload();
          console.log(response);
          let data = response.books;
          let labels = response.categories;
          //  var ctx1 = document.getElementsByClassName('book-chart');

          this.renderPie(
            data,
            labels,
            ctx2,
            'rgba(19, 111, 1, 1)',
            'rgba(253, 13, 13, 1)',
            'rgb(23, 56, 132)'
          );

          //this.renderChart(data, labels, ctx2, '#4e73df');
        },
        (err: HttpErrorResponse) => {
          //super.show('Error', err.message, 'error');
        }
      );
  }
  drawNumberBooksByDays() {
    this.httpService.getAll(CONFIG.URL_BASE + '/analytics/books').subscribe(
      (response: BookAnalytics) => {
        // this.menuI18n = data;
        //CONFIG.LANG = this.settings$.lang;
        //document.getElementById('table').DataTable().ajax.reload();
        console.log(response);
        let data = response.numberIssueBook;
        let labels = response.days;
        var ctx1 = document.getElementsByClassName('book-chart');

        this.renderChart(data, labels, ctx1, '#4e73df');
      },
      (err: HttpErrorResponse) => {
        //super.show('Error', err.message, 'error');
      }
    );
  }

  constructor(httpService: HTTPService) {
    super();
    this.httpService = httpService;
  }

  renderChart(data, labels, ctx, color) {
    var myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: this.dashboardI18n?.issueBookNumberI18n,
            data: data,
            backgroundColor: color,
            borderColor: color,
          },
        ],
      },
    });
  }

  renderPie(data, labels, ctx, color1, color2, color3) {
    var myChart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: labels,
        datasets: [
          {
            label: '',
            data: data,
            backgroundColor: [color1, color2, color3],
            borderColor: 'white',
          },
        ],
      },
    });
  }

  getDashboardByLang(lang) {
    // this.appointements$ = this.appointmentTestService.getAll()
    this.httpService
      .getAll(CONFIG.URL_BASE + '/i18n/dashboard/' + lang)
      .subscribe(
        (data) => {
          this.dashboardI18n = data;
          //console.log(this.circulationI18n);
          //document.getElementById('table').DataTable().ajax.reload();
        },
        (err: HttpErrorResponse) => {
          super.show('Error', err.message, 'error');
        }
      );
  }
}
