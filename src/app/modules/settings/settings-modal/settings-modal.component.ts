import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings-modal',
  templateUrl: './settings-modal.component.html',
  styleUrls: ['./settings-modal.component.css'],
})
export class SettingsModalComponent implements OnInit {
  constructor() {}

  @Input() id: string;
  @Input() settingsI18n;

  ngOnInit(): void {
    console.log(this.id);
  }

  closeModalEdit() {
    let element: HTMLElement = document.getElementsByClassName(
      'close'
    )[0] as HTMLElement;
    element.click();
  }
}
