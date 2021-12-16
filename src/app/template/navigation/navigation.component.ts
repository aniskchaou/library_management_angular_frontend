import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import Settings from 'src/app/main/models/Settings';
import CONFIG from 'src/app/main/urls/urls';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
})
export class NavigationComponent implements OnInit {
  @Input() menuI18n;

  constructor() {}

  ngOnInit(): void {}
}
