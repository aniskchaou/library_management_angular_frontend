import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { URLLoader } from 'src/app/main/configs/URLLoader';
import { AuthentificationService } from 'src/app/main/security/authentification.service';

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

  constructor(
    private router: Router,
    private loginservice: AuthentificationService
  ) {
    super();
  }

  ngOnInit() {
    super.loadScripts();
  }

  doLogin(loginform: NgForm) {
    this.loginservice
      .authenticate(loginform.value.username, loginform.value.password)
      .subscribe(
        (data) => {
          if (data) {
            super.show('StockBay', 'Welcome !', 'success');
            super.loadScripts();
            // this.router.navigate(['/dashboard']);
            this.invalidLogin = false;
            this.router
              .navigateByUrl('/book', { skipLocationChange: true })
              .then(() => {
                this.router.navigate(['/dashboard']);
              });
            this.reloadMenu.emit();
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
