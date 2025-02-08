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

  setDefaultImage(event: Event) {
  (event.target as HTMLImageElement).src = 'https://i.pinimg.com/474x/d4/d3/c0/d4d3c02f855019b7357b6c46da2124da.jpg'; // Default image URL
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
          console.log(data);
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
            console.log(loginform.value)
            
            console.log(password)
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
      
        this.loginservice.authenticate(loginForm.value.username, loginForm.value.password).subscribe(
          (data) => {
            // After successful login, store the credentials in localStorage
            localStorage.setItem('username', loginForm.value.username);
            localStorage.setItem('password', loginForm.value.password);
      
            console.log('Stored Username:', localStorage.getItem('username')); // Logs 'admin'
            console.log('Stored Password:', localStorage.getItem('password')); // Logs 'admin'
      
            // Proceed with the rest of the logic
            this.toastr.info("Welcome! We're glad to have you here.");
            this.buttonLoginClicked =false
            this.router.navigate(['/dashboard']);
          },
          (error) => {
            this.buttonLoginClicked =false
            this.invalidLogin = true;
            this.errorMessage = error.message;
            this.toastr.error("Login failed. Please check your credentials.");
          }
        );
      }
      
      
}
