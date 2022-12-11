import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { URLLoader } from 'src/app/main/configs/URLLoader';
import Settings from 'src/app/main/models/Settings';
import { AuthentificationService } from 'src/app/main/security/authentification.service';
import { HTTPService } from 'src/app/main/services/HTTPService';
import CONFIG from 'src/app/main/urls/urls';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent extends URLLoader implements OnInit {
  username = 'admin';
  password = 'admin';
  invalidLogin = false;
  errorMessage = '';
  @Output() reloadMenu = new EventEmitter();
  settings$: Settings;
  menuI18n: Settings;
  buttonLoginClicked = false;

  constructor(
    private router: Router,
    private loginservice: AuthentificationService,
    private httpService: HTTPService
  ) {
    super();
  }

  ngOnInit() {
    super.loadScripts();
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

  doLogin(loginform: NgForm) {
     this.buttonLoginClicked = true;
     let username = sessionStorage.setItem(
              'username',
              loginform.value.username
            );
            let password = sessionStorage.setItem(
              'password',
              loginform.value.password
            );
            super.show('StockBay', 'Welcome !', 'success');
            super.loadScripts();
            this.buttonLoginClicked = false;
            this.invalidLogin = false;
            this.getDashboardByLang(
              CONFIG.getInstance().getLang(),
              loginform.value.username,
              loginform.value.password
            );
            this.getMenuByLang(
              CONFIG.getInstance().getLang(),
              loginform.value.username,
              loginform.value.password
            );
            this.router.navigate(['/dashboard']);
    
  }
}
