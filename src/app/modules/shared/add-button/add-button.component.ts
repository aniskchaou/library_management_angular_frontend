import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-button',
  templateUrl: './add-button.component.html',
  styleUrls: ['./add-button.component.css'],
})
export class AddButtonComponent implements OnInit {
  constructor() {}

  @Input() itemI18n;

  ngOnInit(): void {}
}
