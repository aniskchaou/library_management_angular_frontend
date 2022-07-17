import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { URLLoader } from 'src/app/main/configs/URLLoader';
import SettingsMessage from 'src/app/main/messages/SettingsMessage';
import Settings from 'src/app/main/models/Settings';
import { HTTPService } from 'src/app/main/services/HTTPService';
import CONFIG from 'src/app/main/urls/urls';

@Component({
  selector: 'app-email-setting',
  templateUrl: './email-setting.component.html',
  styleUrls: ['./email-setting.component.css'],
})
export class EmailSettingComponent extends URLLoader implements OnInit {
  settings$ = [{}];
  id = 0;
  settingsI18n;
  loading = false;
  constructor(
    private httpService: HTTPService,
    private router: Router,
    private messageService: SettingsMessage
  ) {
    super();
  }

  edit(id) {
    this.id = id;
    console.log(id);
  }
  ngOnInit(): void {
    this.getAll();
    this.getSettingsByLang(CONFIG.getInstance().getLang());
  }

  reloadPage() {
    this.router
      .navigateByUrl('/dashboard', { skipLocationChange: true })
      .then(() => {
        this.router.navigate(['/settings']);
      });
  }

  getSettingsByLang(lang) {
    this.httpService
      .getAll(CONFIG.URL_BASE + '/i18n/settings/' + lang)
      .subscribe(
        (data) => {
          this.settingsI18n = data;
        },
        (err: HttpErrorResponse) => {
          super.show('Error', err.message, 'warning');
        }
      );
  }

  delete(id) {
    var r = confirm('Voulez-vous supprimer cet enregistrement ?');
    if (r) {
      this.httpService.remove(CONFIG.URL_BASE + '/settings/delete/' + id);
      super.show(
        'Confirmation',
        this.messageService.confirmationMessages.delete,
        'success'
      );
      this.reloadPage();
    }
  }

  getAll() {
    this.loading = true;
    this.httpService.getAll(CONFIG.URL_BASE + '/email/1').subscribe(
      (data: Settings[]) => {
        this.settings$ = data;
        console.log(this.settings$);
        this.loading = false;
      },
      (err: HttpErrorResponse) => {
        super.show('Error', err.message, 'warning');
      }
    );
  }
}
