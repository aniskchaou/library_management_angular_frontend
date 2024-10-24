import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { URLLoader } from 'src/app/main/configs/URLLoader';
import SettingsMessage from 'src/app/main/messages/SettingsMessage';
import Settings from 'src/app/main/models/Settings';
import { HTTPService } from 'src/app/main/services/HTTPService';
import CONFIG from 'src/app/main/urls/urls';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
})
export class SettingsComponent extends URLLoader implements OnInit {
  settings$ = [{}];
  id = 0;
  settingsI18n;
  loading = false;
  settingsForm: FormGroup;

  constructor(
    private httpService: HTTPService,
    private router: Router,
    private messageService: SettingsMessage,
    private fb: FormBuilder
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
    this.settingsForm = this.fb.group({
      id:1,
      allowUserRegistration: [true],  // default value
      requireEmailVerification: [true],  // default value
      defaultUserRole: ['member'],  // default value
    });
  }

  reloadPage() {
    this.router
      .navigateByUrl('/dashboard', { skipLocationChange: true })
      .then(() => {
        this.router.navigate(['/settings']);
      });
  }

  getSettingsByLang(lang) {
     lang='EN'
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
    this.httpService.getAll(CONFIG.URL_BASE + '/settings/all').subscribe(
      (data: Settings[]) => {
        this.settings$ = data;
        this.loading = false;
      },
      (err: HttpErrorResponse) => {
        super.show('Error', err.message, 'warning');
      }
    );
  }

  onSubmit(): void {
    if (this.settingsForm.valid) {
      const formData = this.settingsForm.value;
      console.log(formData)
      this.httpService.create(CONFIG.URL_BASE+'/settings/save_user_settings', formData).then(
        response => {
          console.log('Settings saved successfully', response);
        },
        error => {
          console.error('Error saving settings', error);
        }
      );
    }
  }
}
