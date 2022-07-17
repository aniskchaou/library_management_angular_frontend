import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal-expense',
  templateUrl: './modal-expense.component.html',
  styleUrls: ['./modal-expense.component.css'],
})
export class ModalExpenseComponent implements OnInit {
  @Input() id: string;
  @Input() expenseI18n;

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
