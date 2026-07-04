import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { URLLoader } from 'src/app/main/configs/URLLoader';

@Component({
    selector: 'app-settings-email-list',
    templateUrl: './settings-email-list.component.html',
    styleUrls: ['./settings-email-list.component.css'],
    standalone: false
})
export class SettingsEmailListComponent extends URLLoader implements OnInit {
  @Input() settings: any;
  @Output() idEvent = new EventEmitter<string>();
  @Input() settingsI18n: any;
  displayedColumns = ['auth', 'enableTLS', 'host', 'email'];
  constructor() {
    super();
  }
  ngOnInit(): void {
    this.loadScripts();
  }

  edit(id) {
    this.editSettings(id);
  }

  editSettings(value: string) {
    this.idEvent.emit(value);
  }
}
