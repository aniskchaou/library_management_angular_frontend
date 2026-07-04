import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { URLLoader } from 'src/app/main/configs/URLLoader';

@Component({
    selector: 'app-settings-sms-list',
    templateUrl: './settings-sms-list.component.html',
    styleUrls: ['./settings-sms-list.component.css'],
    standalone: false
})
export class SettingsSmsListComponent extends URLLoader implements OnInit {
  @Input() settings: any;
  @Output() idEvent = new EventEmitter<string>();
  @Input() settingsI18n: any;
  displayedColumns = ['name', 'telephone', 'address', 'lang', 'actions'];
  filterText = '';

  get filteredSettings(): any[] {
    if (!this.settings) return [];
    const q = this.filterText.trim().toLowerCase();
    if (!q) return this.settings;
    return this.settings.filter((t: any) =>
      [t.name, t.telephone, t.address, t.lang].some(v => v && String(v).toLowerCase().includes(q))
    );
  }
  constructor() {
    super();
  }
  ngOnInit(): void {
    this.loadScripts();
  }

  edit(id) {
    this.editSettings(id);
  }

  showLanguage(language) {
    var lang = '';
    switch (language) {
      case 'EN':
        lang = 'English';
        break;
      case 'AR':
        lang = 'عربى';
        break;
      case 'HN':
        lang = 'हिन्दी';
        break;
      case 'BN':
        lang = 'বাংলা';
        break;
      default:
        lang = 'N/A';
        break;
    }
    return lang;
  }

  editSettings(value: string) {
    this.idEvent.emit(value);
  }
}
