import { Component, OnInit } from '@angular/core';
import { SuperAdminApiService } from '../services/super-admin-api.service';

@Component({
  standalone: false,
  selector: 'app-growth-report',
  template: `
    <div class="container-fluid px-4 py-3">
      <h4 class="mb-3">Growth & Revenue Reports</h4>

      <div class="row g-3 mb-4" *ngIf="dashboard">
        <div class="col-md-3">
          <div class="card text-center border-primary">
            <div class="card-body">
              <div class="fs-3 fw-bold text-primary">{{ dashboard.totalOrganizations }}</div>
              <small class="text-muted">Total Orgs</small>
            </div>
          </div>
        </div>
        <div class="col-md-3">
          <div class="card text-center border-success">
            <div class="card-body">
              <div class="fs-3 fw-bold text-success">{{ dashboard.activeOrganizations }}</div>
              <small class="text-muted">Active Orgs</small>
            </div>
          </div>
        </div>
        <div class="col-md-3">
          <div class="card text-center border-warning">
            <div class="card-body">
              <div class="fs-3 fw-bold text-warning">\${{ dashboard.mrr | number:'1.2-2' }}</div>
              <small class="text-muted">MRR</small>
            </div>
          </div>
        </div>
        <div class="col-md-3">
          <div class="card text-center border-info">
            <div class="card-body">
              <div class="fs-3 fw-bold text-info">\${{ dashboard.arr | number:'1.2-2' }}</div>
              <small class="text-muted">ARR</small>
            </div>
          </div>
        </div>
        <div class="col-md-3">
          <div class="card text-center">
            <div class="card-body">
              <div class="fs-3 fw-bold text-danger">{{ dashboard.churnLast30Days }}</div>
              <small class="text-muted">Churn (30d)</small>
            </div>
          </div>
        </div>
        <div class="col-md-3">
          <div class="card text-center">
            <div class="card-body">
              <div class="fs-3 fw-bold">{{ dashboard.expiringSubscriptions7d }}</div>
              <small class="text-muted">Expiring in 7d</small>
            </div>
          </div>
        </div>
      </div>

      <!-- Subscriptions by Plan -->
      <h5 class="mt-4 mb-3">Subscriptions by Plan</h5>
      <table class="table table-sm table-bordered" *ngIf="byPlan.length">
        <thead class="table-light">
          <tr><th>Plan</th><th>Active Subscriptions</th><th>MRR Contribution</th></tr>
        </thead>
        <tbody>
          <tr *ngFor="let p of byPlan">
            <td><strong>{{ p.planName }}</strong></td>
            <td>{{ p.activeSubscriptions }}</td>
            <td>\${{ p.mrr | number:'1.2-2' }}</td>
          </tr>
        </tbody>
      </table>

      <!-- Expiring Subscriptions -->
      <h5 class="mt-4 mb-3">Expiring Subscriptions (next 30 days)</h5>
      <table class="table table-sm table-hover" *ngIf="expiring.length">
        <thead class="table-light">
          <tr><th>Org ID</th><th>Plan ID</th><th>Status</th><th>Period End</th><th>Billing</th></tr>
        </thead>
        <tbody>
          <tr *ngFor="let s of expiring">
            <td>{{ s.organizationId }}</td>
            <td>{{ s.planId }}</td>
            <td><span class="badge bg-warning text-dark">{{ s.status }}</span></td>
            <td>{{ s.currentPeriodEnd | date:'mediumDate' }}</td>
            <td>{{ s.billingCycle }}</td>
          </tr>
        </tbody>
      </table>
      <p class="text-muted" *ngIf="!expiring.length">No expiring subscriptions in the next 30 days.</p>
    </div>
  `
})
export class GrowthReportComponent implements OnInit {
  dashboard: any = null;
  byPlan: any[] = [];
  expiring: any[] = [];

  constructor(private api: SuperAdminApiService) {}

  ngOnInit() {
    this.api.getSaasDashboard().subscribe(d => this.dashboard = d);
    this.api.getSubscriptionsByPlan().subscribe((p: any[]) => this.byPlan = p);
    this.api.getExpiringSubscriptions(30).subscribe((e: any[]) => this.expiring = e);
  }
}

