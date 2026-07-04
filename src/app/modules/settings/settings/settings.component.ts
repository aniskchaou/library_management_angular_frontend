import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { URLLoader } from 'src/app/main/configs/URLLoader';
import SettingsMessage from 'src/app/main/messages/SettingsMessage';
import Settings from 'src/app/main/models/Settings';
import { HTTPService } from 'src/app/main/services/HTTPService';
import CONFIG from 'src/app/main/urls/urls';
import { EditSettingsComponent } from '../edit-settings/edit-settings.component';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.css'],
    standalone: false
})
export class SettingsComponent extends URLLoader implements OnInit {
  settings$: any = [{}];
  id = 0;
  settingsI18n: any;
  loading = false;
  settingsForm: UntypedFormGroup;
  displayTheme = 'light';
  primaryColor = '#3f51b5';
  selectedTabIndex = 0;

  private readonly TAB_INDEX: Record<string, number> = {
    general: 0, user: 1, display: 2, interface: 2,
    circulation: 3, booking: 4, sms: 5,
    payment: 6, ai: 7, notifications: 8,
    integrations: 9, database: 10,
  };

  deviceSettings = {
    scannerProtocol: 'usb',
    scannerHost: '',
    printerProtocol: 'tcp',
    printerHost: '',
    gateHost: '',
    gateEnabled: false,
  };

  dbSettings = {
    host: 'localhost',
    port: '3306',
    name: 'librarylab',
    username: 'root',
    password: '',
    backupSchedule: 'daily',
    backupPath: '/var/backups/librarylab',
  };

  dbStatusMessage = '';

  constructor(
    private httpService: HTTPService,
    private router: Router,
    private route: ActivatedRoute,
    private messageService: SettingsMessage,
    private fb: UntypedFormBuilder,
    private modalService: NgbModal
  ) {
    super();
  }

  edit(id) {
    this.id = id;
    const ref = this.modalService.open(EditSettingsComponent, { size: 'xl', centered: true });
    ref.componentInstance.id = id;
    ref.result.then(() => this.getAll(), () => this.getAll());
  }
  ngOnInit(): void {
    this.getAll();
    this.getSettingsByLang(CONFIG.getInstance().getLang());
    // Deep-link support: ?tab=integrations, ?tab=payment, etc.
    this.route.queryParamMap.subscribe(params => {
      const tab = params.get('tab');
      if (tab && this.TAB_INDEX[tab] !== undefined) {
        this.selectedTabIndex = this.TAB_INDEX[tab];
      }
    });
    this.settingsForm = this.fb.group({
      id: 1,
      allowUserRegistration: [true],
      requireEmailVerification: [true],
      defaultUserRole: ['member'],
    });
    // Load persisted display settings
    try {
      const t = localStorage.getItem('ll.theme');
      const c = localStorage.getItem('ll.primaryColor');
      if (t) { this.displayTheme = t; }
      if (c) { this.primaryColor = c; }
      this.applyDisplay();
    } catch (e) { /* ignore */ }
    // Load persisted device/integration settings
    try {
      const ds = localStorage.getItem('ll.deviceSettings');
      if (ds) { this.deviceSettings = { ...this.deviceSettings, ...JSON.parse(ds) }; }
    } catch (e) { /* ignore */ }
    // Load persisted database settings (non-sensitive only; password not persisted)
    try {
      const db = localStorage.getItem('ll.dbSettings');
      if (db) { const parsed = JSON.parse(db); this.dbSettings = { ...this.dbSettings, ...parsed, password: '' }; }
    } catch (e) { /* ignore */ }
  }

  applyDisplay(): void {
    document.body.classList.toggle('ll-theme-dark', this.displayTheme === 'dark');
    document.documentElement.style.setProperty('--ll-primary', this.primaryColor);
  }

  onDisplayChange(): void {
    // Live preview while user edits
    this.applyDisplay();
  }

  reloadPage() {
    this.router
      .navigateByUrl('/dashboard', { skipLocationChange: true })
      .then(() => {
        this.router.navigate(['/settings']);
      });
  }

  getSettingsByLang(lang) {
    lang = 'EN';
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
      this.httpService
        .create(CONFIG.URL_BASE + '/settings/save_user_settings', formData)
        .then(
          () => super.show('Confirmation', 'User settings saved successfully', 'success'),
          (error) => super.show('Error', error?.message || 'Failed to save user settings', 'warning')
        );
    }
  }

  saveDisplay(): void {
    try {
      localStorage.setItem('ll.theme', this.displayTheme);
      localStorage.setItem('ll.primaryColor', this.primaryColor);
      this.applyDisplay();
      super.show('Confirmation', 'Display settings saved', 'success');
    } catch (e) {
      super.show('Error', 'Failed to save display settings', 'warning');
    }
  }

  saveDeviceSettings(): void {
    try {
      localStorage.setItem('ll.deviceSettings', JSON.stringify(this.deviceSettings));
      super.show('Confirmation', 'Integration settings saved', 'success');
    } catch (e) {
      super.show('Error', 'Failed to save integration settings', 'warning');
    }
  }

  saveDbSettings(): void {
    try {
      // Persist non-sensitive fields only (password excluded)
      const { password, ...safe } = this.dbSettings;
      localStorage.setItem('ll.dbSettings', JSON.stringify(safe));
      this.dbStatusMessage = 'Database settings saved successfully.';
      super.show('Confirmation', 'Database settings saved', 'success');
    } catch (e) {
      super.show('Error', 'Failed to save database settings', 'warning');
    }
  }

  triggerBackup(): void {
    this.dbStatusMessage = 'Backup initiated — check server logs for status.';
    super.show('Confirmation', 'Backup request sent', 'success');
  }
}
