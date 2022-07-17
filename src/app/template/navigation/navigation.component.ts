import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import Settings from 'src/app/main/models/Settings';
import { HTTPService } from 'src/app/main/services/HTTPService';
import CONFIG from 'src/app/main/urls/urls';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
})
export class NavigationComponent implements OnInit {
  menuI18n;

  constructor(private httpService: HTTPService) {}

  ngOnInit(): void {
    this.httpService.menuI18n$.subscribe((data) => {
      this.menuI18n = data;
    });
  }
}
