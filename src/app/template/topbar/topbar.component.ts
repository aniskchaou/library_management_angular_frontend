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
  constructor(
    private authService: AuthentificationService,
    private router: Router,
    private httpService: HTTPService,
    private settingsMessage: SettingsMessage
  ) {
    super();
  }

  ngOnInit(): void {}

  changeLang(lang) {
    this.httpService
      .get(CONFIG.URL_BASE + '/settings/updatelang/' + lang)
      .subscribe(
        (data) => {
          super.show(
            'Information',
            this.settingsMessage.editConfirmation[lang],
            'info'
          );
          this.reloadPage();
        },
        (err: HttpErrorResponse) => {
          super.show('Error', err.message, 'warning');
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
}
