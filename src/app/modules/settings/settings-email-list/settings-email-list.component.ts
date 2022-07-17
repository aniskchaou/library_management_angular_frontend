import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { URLLoader } from 'src/app/main/configs/URLLoader';

@Component({
  selector: 'app-settings-email-list',
  templateUrl: './settings-email-list.component.html',
  styleUrls: ['./settings-email-list.component.css'],
})
export class SettingsEmailListComponent extends URLLoader implements OnInit {
  @Input() settings;
  @Output() idEvent = new EventEmitter<string>();
  @Input() settingsI18n;
  constructor() {
    super();
  }
  ngOnInit(): void {
    console.log(this.settings);
    this.loadScripts();
  }

  edit(id) {
    this.editSettings(id);
  }

  editSettings(value: string) {
    this.idEvent.emit(value);
  }
}
