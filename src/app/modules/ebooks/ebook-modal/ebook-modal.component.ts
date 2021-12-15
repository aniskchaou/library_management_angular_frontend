import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-ebook-modal',
  templateUrl: './ebook-modal.component.html',
  styleUrls: ['./ebook-modal.component.css'],
})
export class EbookModalComponent implements OnInit {
  constructor() {}

  @Input() id: string;

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
