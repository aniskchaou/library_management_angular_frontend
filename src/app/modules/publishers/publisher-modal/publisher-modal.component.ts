import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-publisher-modal',
  templateUrl: './publisher-modal.component.html',
  styleUrls: ['./publisher-modal.component.css'],
})
export class PublisherModalComponent implements OnInit {
  @Input() id: string;
  @Input() publisherI18n;

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
