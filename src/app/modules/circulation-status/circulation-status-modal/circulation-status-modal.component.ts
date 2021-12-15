import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-circulation-status-modal',
  templateUrl: './circulation-status-modal.component.html',
  styleUrls: ['./circulation-status-modal.component.css'],
})
export class CirculationStatusModalComponent implements OnInit {
  constructor() {}

  @Input() id: string;
  @Input() circulationStatusI18n;
  ngOnInit(): void {}

  closeModalAdd() {
    let element: HTMLElement = document.getElementsByClassName(
      'close'
    )[0] as HTMLElement;
    element.click();
  }

  closeModalEdit() {
    let element: HTMLElement = document.getElementsByClassName(
      'close'
    )[1] as HTMLElement;
    element.click();
  }
}
