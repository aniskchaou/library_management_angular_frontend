import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { URLLoader } from './main/configs/URLLoader';

import Settings from './main/models/Settings';
import { HTTPService } from './main/services/HTTPService';
import CONFIG from './main/urls/urls';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  private allscript = [
    '../assets/vendors/jquery/dist/jquery.min.js',
    '../assets/vendors/popper.js/dist/umd/popper.min.js',
    '../assets/vendors/bootstrap/dist/js/bootstrap.min.js',
    '../assets/js/main.js',
    '../assets/vendors/datatables.net/js/jquery.dataTables.min.js',
    '../assets/vendors/datatables.net-bs4/js/dataTables.bootstrap4.min.js',
    '../assets/vendors/datatables.net-buttons/js/dataTables.buttons.min.js',
    '../assets/vendors/datatables.net-buttons-bs4/js/buttons.bootstrap4.min.js',
    '../assets/vendors/jszip/dist/jszip.min.js',
    '../assets/vendors/pdfmake/build/pdfmake.min.js',
    '../assets/vendors/pdfmake/build/vfs_fonts.js',
    '../assets/vendors/datatables.net-buttons/js/buttons.html5.min.js',
    '../assets/vendors/datatables.net-buttons/js/buttons.print.min.js',
    '../assets/vendors/datatables.net-buttons/js/buttons.colVis.min.js',
    '../assets/js/init-scripts/data-table/datatables-init.js',
  ];
  private loadScripts() {
    let container = document.getElementsByTagName('body')[0];
    let promise = Promise.resolve();
    for (let url of this.allscript) {
      promise = promise.then(
        (_) =>
          new Promise((resolve, reject) => {
            let script = document.createElement('script');
            script.innerHTML = '';
            script.src = url;
            script.async = true;
            script.defer = true;
            script.onload = () => {
              resolve();
            };
            script.onerror = (e) => {
              reject(e);
            };
            container.appendChild(script);
          })
      );
    }
  }

  settings$: Settings;
  menuI18n;

  constructor(private _router: Router, private httpService: HTTPService) {}

  hasRoute(route: string) {
    return this._router.url.includes(route);
  }

  ngOnInit() {
    this.loadScripts();
    this.getSettings();
    this.getMenuItems();
  }

  getSettings() {
    this.httpService.getAll(CONFIG.URL_BASE + '/settings/1').subscribe(
      (data: Settings) => {
        this.settings$ = data;
        CONFIG.LANG = this.settings$.lang;
      },
      (err: HttpErrorResponse) => {
        //super.show('Error', err.message, 'warning');
      }
    );
  }

  getMenuItems() {
    this.httpService
      .getAll(CONFIG.URL_BASE + '/i18n/menu/' + CONFIG.LANG)
      .subscribe(
        (data: Settings) => {
          this.menuI18n = data;
        },
        (err: HttpErrorResponse) => {
          //super.show('Error', err.message, 'warning');
        }
      );
  }
}
