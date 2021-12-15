import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { URLLoader } from 'src/app/main/configs/URLLoader';

@Component({
  selector: 'app-settings-list',
  templateUrl: './settings-list.component.html',
  styleUrls: ['./settings-list.component.css'],
})
export class SettingsListComponent extends URLLoader implements OnInit {
  @Input() settings;
  @Output() idEvent = new EventEmitter<string>();
  @Input() settingsI18n;
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
