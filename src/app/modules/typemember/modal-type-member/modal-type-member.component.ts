import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-modal-type-member',
    templateUrl: './modal-type-member.component.html',
    styleUrls: ['./modal-type-member.component.css'],
    standalone: false
})
export class ModalTypeMemberComponent implements OnInit {
  constructor() {}

  @Input() id: string;
  @Input() typeMemberI18n;

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
