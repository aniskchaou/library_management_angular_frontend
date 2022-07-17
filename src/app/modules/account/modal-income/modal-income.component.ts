import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal-income',
  templateUrl: './modal-income.component.html',
  styleUrls: ['./modal-income.component.css'],
})
export class ModalIncomeComponent implements OnInit {
  @Input() id: string;
  @Input() incomeI18n;

  constructor() {}

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
