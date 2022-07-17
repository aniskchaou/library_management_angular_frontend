import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { URLLoader } from 'src/app/main/configs/URLLoader';
import SettingsMessage from 'src/app/main/messages/SettingsMessage';
import { AuthentificationService } from 'src/app/main/security/authentification.service';
import { HTTPService } from 'src/app/main/services/HTTPService';
import CONFIG from 'src/app/main/urls/urls';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css'],
})
export class TopbarComponent extends URLLoader implements OnInit {
  @Input() menuI18n;
  searchInput: string;
  user = sessionStorage.getItem('username');
  sysLang;
  constructor(
    private authService: AuthentificationService,
    private router: Router,
    private httpService: HTTPService,
    private settingsMessage: SettingsMessage
  ) {
    super();
    //this.getDashboardByLang(CONFIG.getInstance().getLang());
    // this.getMenuByLang(CONFIG.getInstance().getLang());
    //this.getCategoryByLang(CONFIG.getInstance().getLang());
  }

  ngOnInit(): void {
    this.sysLang = CONFIG.getInstance().getLang();
    this.httpService.menuI18n$.subscribe((data) => {
      this.menuI18n = data;
    });
  }

  changeLang(lang) {
    this.httpService
      .getAllLang(
        CONFIG.URL_BASE + '/settings/updatelang/' + lang,
        sessionStorage.getItem('username'),
        sessionStorage.getItem('password')
      )
      .subscribe(
        (data) => {
          CONFIG.getInstance().setLang(lang);
          super.show(
            'Information',
            this.settingsMessage.editConfirmation[lang],
            'info'
          );
          this.getDashboardByLang(
            CONFIG.getInstance().getLang(),
            sessionStorage.getItem('username'),
            sessionStorage.getItem('password')
          );
          this.getMenuByLang(
            CONFIG.getInstance().getLang(),
            sessionStorage.getItem('username'),
            sessionStorage.getItem('password')
          );
          this.getCategoryByLang(
            CONFIG.getInstance().getLang(),
            sessionStorage.getItem('username'),
            sessionStorage.getItem('password')
          );
          this.logout();
        },
        (err: HttpErrorResponse) => {
          super.show('Error', err.message, 'warning');
        }
      );
  }

  getDashboardByLang(lang, username, password) {
    this.httpService
      .getAllLang(
        CONFIG.URL_BASE + '/i18n/dashboard/' + lang,
        username,
        password
      )
      .subscribe(
        (data) => {
          console.log(data);
          this.httpService.dashboardI18n.next(data);
        },
        (err: HttpErrorResponse) => {
          super.show('Error', err.message, 'warning');
          //this.reload = true;
        }
      );
  }

  getMenuByLang(lang, username, password) {
    this.httpService
      .getAllLang(CONFIG.URL_BASE + '/i18n/menu/' + lang, username, password)
      .subscribe(
        (data) => {
          console.log(data);
          this.httpService.menuI18n.next(data);
        },
        (err: HttpErrorResponse) => {
          super.show('Error', err.message, 'warning');
          //this.reload = true;
        }
      );
  }

  logout() {
    this.authService.logOut();
    this.router.navigate(['/login']);
  }
  reloadPage() {
    this.router
      .navigateByUrl('/dashboard', { skipLocationChange: true })
      .then(() => {
        this.router.navigate(['/login']);
      });
  }

  getCategoryByLang(lang, username, password) {
    this.httpService
      .getAllLang(
        CONFIG.URL_BASE + '/i18n/category/' + lang,
        username,
        password
      )
      .subscribe(
        (data) => {
          this.httpService.categoryI18n.next(data);
        },
        (err: HttpErrorResponse) => {
          super.show('Error', err.message, 'warning');
        }
      );
  }
}
