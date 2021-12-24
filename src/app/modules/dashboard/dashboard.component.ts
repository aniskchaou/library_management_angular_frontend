import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as Chart from 'chart.js';
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
  httpService: HTTPService;
  dashboardI18n;
  dashboardAnalytics;
  reload = false;
  ngOnInit(): void {
    super.loadScripts();

    this.drawNumberBooksByDays();

    this.drawNumberBooksByCategory();
    this.getDashboardAnalytics();
    this.getDashboardByLang(CONFIG.getInstance().getLang());

    console.log(sessionStorage.getItem('username'));
    console.log(sessionStorage.getItem('password'));
  }

  ngOnChanges() {
    this.drawNumberBooksByDays();

    this.drawNumberBooksByCategory();
  }

  getDashboardAnalytics() {
    this.reload = true;
    this.httpService
      .getAll(CONFIG.URL_BASE + '/analytics/dashboardanalytics')
      .subscribe(
        (data: DashboardAnalytics) => {
          this.dashboardAnalytics = data;
          this.reload = false;
        },
        (err: HttpErrorResponse) => {
          //super.show('Error', err.message, 'warning');
          this.reload = true;
          //this.reloadPage();
          //this.router.navigate(['/']);
          window.location.replace('/');
        }
      );
  }

  drawNumberBooksByCategory() {
    var ctx2 = document.getElementsByClassName('category-chart');

    this.httpService
      .getAll(CONFIG.URL_BASE + '/analytics/booksbycategory')
      .subscribe(
        (response: BookCategoryAnalytics) => {
          console.log(response);
          let data = response.books;
          let labels = response.categories;

          this.renderPie(
            data,
            labels,
            ctx2,
            'rgba(19, 111, 1, 1)',
            'rgba(253, 13, 13, 1)',
            'rgb(23, 56, 132)'
          );
        },
        (err: HttpErrorResponse) => {}
      );
  }
  drawNumberBooksByDays() {
    this.httpService.getAll(CONFIG.URL_BASE + '/analytics/books').subscribe(
      (response: BookAnalytics) => {
        console.log(response);
        let data = response.numberIssueBook;
        let labels = response.days;
        var ctx1 = document.getElementsByClassName('book-chart');
        this.renderChart(data, labels, ctx1, '#4e73df');
      },
      (err: HttpErrorResponse) => {
        //super.show('Error', err.message, 'warning');
        //this.reload = true;
      }
    );
  }

  reloadPage() {
    this.router
      .navigateByUrl('/settings', { skipLocationChange: true })
      .then(() => {
        this.router.navigate(['/dahsboard']);
      });
  }

  constructor(
    httpService: HTTPService,
    private router: Router,
    private authService: AuthentificationService
  ) {
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
    this.httpService
      .getAll(CONFIG.URL_BASE + '/i18n/dashboard/' + lang)
      .subscribe(
        (data) => {
          this.dashboardI18n = data;
        },
        (err: HttpErrorResponse) => {
          // super.show('Error', err.message, 'warning');
          //this.reload = true;
        }
      );
  }
}
