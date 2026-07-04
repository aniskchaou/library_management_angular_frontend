import { Component, OnInit } from '@angular/core';
import { SuperAdminApiService } from '../services/super-admin-api.service';

@Component({
  standalone: false,
  selector: 'app-user-analytics',
  template: `
    <div class="container-fluid px-4 py-3">
      <h4 class="mb-3">User Analytics</h4>
      <div class="row g-3" *ngIf="stats">
        <div class="col-md-3">
          <div class="card text-center border-primary">
            <div class="card-body">
              <div class="fs-3 fw-bold text-primary">{{ stats.totalUsers | number }}</div>
              <small class="text-muted">Total Users</small>
            </div>
          </div>
        </div>
        <div class="col-md-3">
          <div class="card text-center border-danger">
            <div class="card-body">
              <div class="fs-3 fw-bold text-danger">{{ stats.superAdmins }}</div>
              <small class="text-muted">Super Admins</small>
            </div>
          </div>
        </div>
      </div>
      <div *ngIf="!stats" class="text-center py-5"><div class="spinner-border"></div></div>
    </div>
  `
})
export class UserAnalyticsComponent implements OnInit {
  stats: any = null;

  constructor(private api: SuperAdminApiService) {}

  ngOnInit() {
    this.api.getUserAnalytics().subscribe(s => this.stats = s);
  }
}

