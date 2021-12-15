import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-requested-book-modal',
  templateUrl: './requested-book-modal.component.html',
  styleUrls: ['./requested-book-modal.component.css'],
})
export class RequestedBookModalComponent implements OnInit {
  @Input() id: string;
  @Input() requestedBookI18n;

  ngOnInit(): void {}

  constructor() {}

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
