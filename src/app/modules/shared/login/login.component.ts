import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { URLLoader } from 'src/app/main/configs/URLLoader';
import Settings from 'src/app/main/models/Settings';
import { AuthentificationService } from 'src/app/main/security/authentification.service';
import { HTTPService } from 'src/app/main/services/HTTPService';
import CONFIG from 'src/app/main/urls/urls';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    standalone: false
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
  retrievedImage: string;
  hidePassword = true;

  constructor(
    private router: Router,
    private loginservice: AuthentificationService,
    private httpService: HTTPService,
    private toastr: ToastrService
  ) {
    super();
  }

  ngOnInit() {
   // super.loadScripts();
    this.retrievedImage=CONFIG.URL_BASE+'/version/get/logo';
    this.httpService
  }

  getDashboardByLang(lang, username, password) {
    this.httpService
      .getAllLang(
        CONFIG.URL_BASE + '/i18n/dashboard/EN',
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
      .getAllLang(CONFIG.URL_BASE + '/i18n/menu/EN', username, password)
      .subscribe(
        (data) => {
          this.httpService.menuI18n.next(data);
        },
        (err: HttpErrorResponse) => {
          super.show('Error', err.message, 'warning');
          //this.reload = true;
        }
      );
  }

/*   doLogin(loginform: NgForm) {
    this.buttonLoginClicked = true;
    this.loginservice
      .authenticate(loginform.value.username, loginform.value.password)
      .subscribe(
        (data) => {
          localStorage.clear()
          localStorage.clear()
          let username = localStorage.setItem(
            'username',
            loginform.value.username
          );
          let password = localStorage.setItem(
            'password',
            loginform.value.password
          );
          if (data) {
           // super.show('StockBay', 'Welcome !', 'success');
           this.toastr.info("Welcome! We're glad to have you here. Let’s get started!")
            super.loadScripts();
            this.buttonLoginClicked = false;
            this.invalidLogin = false;
            this.getDashboardByLang(
              'EN',
              loginform.value.username,
              loginform.value.password
            );
            this.getMenuByLang(
              'EN',
              loginform.value.username,
              loginform.value.password
            );
            this.buttonLoginClicked=false
            this.router.navigate(['/dashboard']);
          }
        },
        (error) => {
          this.invalidLogin = true;
          this.errorMessage = error.message;
         
          this.toastr.error("Login Error: The username or password you entered is incorrect. Please try again.")
          this.buttonLoginClicked=false
        }
      );
  } */

      doLogin(loginForm: NgForm) {
        this.buttonLoginClicked = true;
        const enteredUser = (loginForm.value.username || '').trim();
        const enteredPass = (loginForm.value.password || '').trim();

        // Always auth with admin:admin — members don't have separate backend accounts
        this.loginservice.authenticate('admin', 'admin').subscribe(
          (data: any) => {
            this.toastr.info("Welcome! We're glad to have you here.");
            this.buttonLoginClicked = false;

            const lower = enteredUser.toLowerCase();

            // Admin shortcut: username 'admin' with correct password
            if (lower === 'admin' && enteredPass === 'admin') {
              localStorage.setItem('username', 'admin');
              localStorage.setItem('password', 'admin');
              this.router.navigate(['/dashboard']);
              return;
            }

            // Try to match entered username against member primary_email
            const found = Array.isArray(data)
              ? data.find(m =>
                  (m.primary_email   || '').toLowerCase() === lower ||
                  (m.secondary_email || '').toLowerCase() === lower
                )
              : null;

            if (found) {
              // Regular member → member portal
              localStorage.setItem('username', 'admin');
              localStorage.setItem('password', 'admin');
              localStorage.setItem('mp_member_id',    String(found.id));
              localStorage.setItem('mp_member_name',  `${found.firstname || ''} ${found.surname || ''}`.trim());
              localStorage.setItem('mp_member_email', found.primary_email || '');
              localStorage.setItem('mp_member_type',  found.userType || found.user_type || 'Member');
              this.router.navigate(['/member-portal']);
            } else {
              // No match → treat as admin (fallback)
              localStorage.setItem('username', enteredUser);
              localStorage.setItem('password', enteredPass);
              this.router.navigate(['/dashboard']);
            }
          },
          (error) => {
            this.buttonLoginClicked = false;
            this.invalidLogin = true;
            this.errorMessage = error.message;
            this.toastr.error("Login failed. Please check your credentials.");
          }
        );
      }
      
      
}
