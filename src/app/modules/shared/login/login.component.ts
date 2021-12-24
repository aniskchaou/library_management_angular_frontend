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

  constructor(
    private router: Router,
    private loginservice: AuthentificationService,
    private httpService: HTTPService
  ) {
    super();
  }

  getMenuItems() {
    this.httpService
      .getAll(CONFIG.URL_BASE + '/i18n/menu/' + CONFIG.getInstance().getLang())
      .subscribe(
        (data: Settings) => {
          this.menuI18n = data;
        },
        (err: HttpErrorResponse) => {
          //super.show('Error', err.message, 'warning');
        }
      );
  }

  ngOnInit() {
    super.loadScripts();
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

  doLogin(loginform: NgForm) {
    this.loginservice
      .authenticate(loginform.value.username, loginform.value.password)
      .subscribe(
        (data) => {
          if (data) {
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
            // this.reloadMenu.emit();

            this.invalidLogin = false;
            this.reloadMenu.emit();

            /* this.router
              .navigateByUrl('/login', { skipLocationChange: true })
              .then(() => {
                this.router.navigate(['/dashboard']);
              });*/
          }
        },
        (error) => {
          this.invalidLogin = true;
          this.errorMessage = error.message;
          super.show(
            'Error Authentification',
            'Error password or username',
            'warning'
          );
        }
      );
  }
}
