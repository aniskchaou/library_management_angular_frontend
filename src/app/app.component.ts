import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { URLLoader } from './main/configs/URLLoader';

import Settings from './main/models/Settings';
import { AuthentificationService } from './main/security/authentification.service';
import { HTTPService } from './main/services/HTTPService';
import CONFIG from './main/urls/urls';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    standalone: false
})
export class AppComponent {
  // jQuery and DataTables scripts removed. Bootstrap 5 JS is loaded via angular.json scripts.
  private allscript: string[] = [
    '../assets/js/main.js',
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
  loading = false;
  searchInput: string;

  constructor(
    private _router: Router,
    private httpService: HTTPService,
    private authService: AuthentificationService
  ) {}

  private readonly _publicRoutes = ['login', 'register', 'reset-password', 'forgot-password', 'opac', 'opac-home', 'opac-account', 'member-portal'];

  hasRoute(route: string) {
    const urlPath = this._router.url.split('?')[0];
    return urlPath === '/' + route;
  }

  isPublicRoute(): boolean {
    const urlPath = this._router.url.split('?')[0].replace('/', '');
    return this._publicRoutes.includes(urlPath);
  }

  ngOnInit() {
    this.loadScripts();
    if (this.authService.isUserLoggedIn()) {
      // Don't load admin resources for member portal users
      if (!localStorage.getItem('mp_member_id')) {
        this.getSettings();
        this.getMenuItems();
      }
    } else if (!this.isPublicRoute()) {
      this._router.navigate(['/opac-home']);
    }


  }

  reloadMenu() {
    this.getSettings();
    this.getMenuItems();

    //this._router.navigate(['/dashboard']);
    this._router
      .navigateByUrl('/login', { skipLocationChange: true })
      .then(() => {
        this._router.navigate(['/dashboard']);
      });
  }

  getSettings() {
    this.httpService.getAll(CONFIG.URL_BASE + '/settings/1').subscribe(
      (data: Settings) => {
        this.settings$ = data;
        CONFIG.getInstance().setLang(this.settings$.lang);
      },
      (err: HttpErrorResponse) => {
        //super.show('Error', err.message, 'warning');
      }
    );
  }

  getMenuItems() {
    this.httpService
      .getAll(CONFIG.URL_BASE + '/i18n/menu/EN')
      .subscribe(
        (data: Settings) => {
          this.menuI18n = data;
        },
        (err: HttpErrorResponse) => {
          //super.show('Error', err.message, 'warning');
        }
      );
  }

  search(value) {
    this._router.navigate(['/search/' + value]);
  }
}
