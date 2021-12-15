import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-circulation-modal',
  templateUrl: './circulation-modal.component.html',
  styleUrls: ['./circulation-modal.component.css'],
})
export class CirculationModalComponent implements OnInit {
  constructor() {}

  @Input() id: string;
  @Input() circulationI18n;
  @Input() circulations;

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
