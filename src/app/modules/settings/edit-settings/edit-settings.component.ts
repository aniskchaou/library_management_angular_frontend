import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Optional, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { URLLoader } from 'src/app/main/configs/URLLoader';

import Settings from 'src/app/main/models/Settings';
import { HTTPService } from 'src/app/main/services/HTTPService';
import CONFIG from 'src/app/main/urls/urls';

@Component({
    selector: 'app-edit-settings',
    templateUrl: './edit-settings.component.html',
    styleUrls: ['./edit-settings.component.css'],
    standalone: false
})
export class EditSettingsComponent extends URLLoader implements OnInit {
  model: any;
  @Input() id: string;
  @Output() closeModalEvent = new EventEmitter<string>();
  settingsI18n: any;

  closeModal() {
    this.closeModalEvent.emit();
    if (this.activeModal) {
      this.activeModal.dismiss();
    }
  }

  constructor(
    private httpService: HTTPService,
    private router: Router,
    @Optional() private activeModal: NgbActiveModal
  ) {
    super();
    this.model = this.create();
  }

  create() {
    return new Settings(0, '', '', '', '', '', '');
  }

  ngOnInit(): void {
    this.getSettingsByLang(CONFIG.getInstance().getLang());
    if (this.id) {
      this.loadSettings();
    }
  }

  ngOnChanges(changes: any) {
    if (this.id) {
      this.loadSettings();
    }
  }

  private loadSettings() {
    this.httpService
      .get(CONFIG.URL_BASE + '/settings/' + this.id)
      .subscribe((data: Settings) => {
        this.model = data;
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
    super.show('Confirmation', 'Settings updated successfully', 'success');
    this.closeModal();
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
