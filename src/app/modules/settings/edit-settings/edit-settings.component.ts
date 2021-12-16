import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

import { URLLoader } from 'src/app/main/configs/URLLoader';
import CategoryMessage from 'src/app/main/messages/CategoryMessage';
import Settings from 'src/app/main/models/Settings';
import { HTTPService } from 'src/app/main/services/HTTPService';
import CONFIG from 'src/app/main/urls/urls';

@Component({
  selector: 'app-edit-settings',
  templateUrl: './edit-settings.component.html',
  styleUrls: ['./edit-settings.component.css'],
})
export class EditSettingsComponent extends URLLoader implements OnInit {
  model: Settings;
  @Input() id: string;
  @Output() closeModalEvent = new EventEmitter<string>();
  settingsI18n;

  closeModal() {
    this.closeModalEvent.emit();
  }

  constructor(
    private httpService: HTTPService,
    private message: CategoryMessage,
    private router: Router
  ) {
    super();
    this.model = this.create();
  }

  create() {
    return new Settings(0, '', '', '', '', '', '');
  }

  ngOnInit(): void {
    this.getSettingsByLang(CONFIG.getInstance().getLang());
  }

  ngOnChanges(changes: any) {
    this.httpService
      .get(CONFIG.URL_BASE + '/settings/' + this.id)
      .subscribe((data: Settings) => {
        this.model = data;
        console.log(this.model);
      });
  }

  goBack() {
    this.router
      .navigateByUrl('/dashboard', { skipLocationChange: true })
      .then(() => {
        this.router.navigate(['/settings']);
      });
  }

  edit() {
    this.httpService.create(CONFIG.URL_BASE + '/settings/create', this.model);
    CONFIG.getInstance().setLang(this.model.lang);
    console.log(this.model.lang);
    this.closeModal();
    this.goBack();
    super.show(
      'Confirmation',
      this.message.confirmationMessages.edit,
      'success'
    );
    this.router
      .navigateByUrl('/dashboard', { skipLocationChange: true })
      .then(() => {
        this.router.navigate(['/login']);
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
}
