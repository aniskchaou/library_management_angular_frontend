import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-writer-modal',
  templateUrl: './writer-modal.component.html',
  styleUrls: ['./writer-modal.component.css'],
})
export class WriterModalComponent implements OnInit {
  constructor() {}

  @Input() id: string;
  @Input() writerI18n;

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
