import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import Settings from 'src/app/main/models/Settings';
import { HTTPService } from 'src/app/main/services/HTTPService';
import CONFIG from 'src/app/main/urls/urls';
import * as $ from 'jquery';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
})
export class NavigationComponent implements OnInit {
  menuI18n;
  dashboardAnalytics;
  version: string='0.0.0';
  retrievedImage: string;

  constructor(private httpService: HTTPService) {}

  setDefaultImage(event: Event) {
  (event.target as HTMLImageElement).src = 'https://i.pinimg.com/474x/d4/d3/c0/d4d3c02f855019b7357b6c46da2124da.jpg'; // Default image URL
}

  ngOnInit(): void {
    this.retrievedImage=CONFIG.URL_BASE+'/version/get/logo';
    $('#sidebarToggle').on('click', function () {
      $('body').toggleClass('sidebar-toggled');
      $('.sidebar').toggleClass('toggled');
      if ($('.sidebar').hasClass('toggled')) {
       // $('.sidebar .collapse').collapse('hide');
      }
    });

    this.httpService
    .getAll(CONFIG.URL_BASE + '/version/api/version')
    .subscribe(
      (data:string) => {
        console.log(data)
        this.version = data;
      },
      (err: HttpErrorResponse) => {}
    );

    this.httpService.menuI18n$.subscribe((data) => {
      this.menuI18n = data;
    });

    this.httpService
    .getAll(CONFIG.URL_BASE + '/analytics/shortanalytics/')
    .subscribe(
      (data) => {
        this.dashboardAnalytics = data;
        //this.loading = false;
      },
      (err: HttpErrorResponse) => {}
    );
  }
  

  favorites: Set<string> = new Set();

  toggleFavorite(item: string): void {
    if (this.favorites.has(item)) {
      this.favorites.delete(item);
    } else {
      this.favorites.add(item);
    }
  }

  isFavorited(item: string): boolean {
    return this.favorites.has(item);
  }

 
}
