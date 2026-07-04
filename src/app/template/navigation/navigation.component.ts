import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import Settings from 'src/app/main/models/Settings';
import { HTTPService } from 'src/app/main/services/HTTPService';
import CONFIG from 'src/app/main/urls/urls';

@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.css'],
    standalone: false
})
export class NavigationComponent implements OnInit {
  menuI18n;
  dashboardAnalytics;
  version: string='0.0.0';
  retrievedImage: string;

  constructor(private httpService: HTTPService) {}


  ngOnInit(): void {
    this.retrievedImage=CONFIG.URL_BASE+'/version/get/logo';
    // Vanilla JS sidebar toggle (replaces former jQuery handler)
    const toggleBtn = document.getElementById('sidebarToggle');
    if (toggleBtn) {
      toggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('sidebar-toggled');
        document.querySelectorAll('.sidebar').forEach(el => el.classList.toggle('toggled'));
      });
    }

    this.httpService
    .getAll(CONFIG.URL_BASE + '/version/api/version')
    .subscribe(
      (data:string) => {
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
