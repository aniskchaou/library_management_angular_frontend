import { Component, OnInit } from '@angular/core';
import { SuperAdminApiService } from '../services/super-admin-api.service';

@Component({
  standalone: false,
  selector: 'app-super-admin-dashboard',
  template: `
    <div class="sa-dashboard">
      <h1 class="sa-title">Super Admin Dashboard</h1>

      <div class="sa-cards" *ngIf="metrics">
        <div class="sa-card">
          <div class="sa-card-label">Total Organizations</div>
          <div class="sa-card-value">{{ metrics.totalOrganizations }}</div>
        </div>
        <div class="sa-card sa-card-green">
          <div class="sa-card-label">Active Organizations</div>
          <div class="sa-card-value">{{ metrics.activeOrganizations }}</div>
        </div>
        <div class="sa-card sa-card-red">
          <div class="sa-card-label">Suspended</div>
          <div class="sa-card-value">{{ metrics.suspendedOrganizations }}</div>
        </div>
        <div class="sa-card">
          <div class="sa-card-label">Total Users</div>
          <div class="sa-card-value">{{ metrics.totalUsers }}</div>
        </div>
        <div class="sa-card sa-card-blue">
          <div class="sa-card-label">MRR</div>
          <div class="sa-card-value">\${{ metrics.mrr | number:'1.2-2' }}</div>
        </div>
        <div class="sa-card sa-card-blue">
          <div class="sa-card-label">ARR</div>
          <div class="sa-card-value">\${{ metrics.arr | number:'1.2-2' }}</div>
        </div>
        <div class="sa-card">
          <div class="sa-card-label">Active Subscriptions</div>
          <div class="sa-card-value">{{ metrics.activeSubscriptions }}</div>
        </div>
        <div class="sa-card sa-card-orange">
          <div class="sa-card-label">Churn (30d)</div>
          <div class="sa-card-value">{{ metrics.churnLast30Days }}</div>
        </div>
        <div class="sa-card sa-card-orange">
          <div class="sa-card-label">Expiring (7d)</div>
          <div class="sa-card-value">{{ metrics.expiringSubscriptions7d }}</div>
        </div>
      </div>

      <div class="sa-nav-links">
        <a routerLink="/super-admin/tenants" class="sa-nav-btn">Manage Tenants</a>
        <a routerLink="/super-admin/plans" class="sa-nav-btn">Manage Plans</a>
        <a routerLink="/super-admin/users" class="sa-nav-btn">User Management</a>
        <a routerLink="/super-admin/analytics" class="sa-nav-btn">Analytics</a>
        <a routerLink="/super-admin/audit-logs" class="sa-nav-btn">Audit Logs</a>
        <a routerLink="/super-admin/settings" class="sa-nav-btn">Platform Settings</a>
        <a routerLink="/super-admin/monitoring" class="sa-nav-btn">Monitoring</a>
        <a routerLink="/super-admin/invoices" class="sa-nav-btn">Invoices</a>
        <a routerLink="/super-admin/coupons" class="sa-nav-btn">Coupons</a>
        <a routerLink="/super-admin/reports/growth" class="sa-nav-btn">Growth Report</a>
        <a routerLink="/super-admin/reports/users" class="sa-nav-btn">User Analytics</a>
      </div>
    </div>
  `,
  styles: [`
    .sa-dashboard { padding: 24px; }
    .sa-title { font-size: 24px; font-weight: 700; margin-bottom: 24px; }
    .sa-cards { display: flex; flex-wrap: wrap; gap: 16px; margin-bottom: 32px; }
    .sa-card { background: #fff; border: 1px solid #e0e0e0; border-radius: 8px;
      padding: 20px 28px; min-width: 160px; box-shadow: 0 1px 4px rgba(0,0,0,.06); }
    .sa-card-label { font-size: 12px; color: #888; text-transform: uppercase; letter-spacing: .5px; }
    .sa-card-value { font-size: 28px; font-weight: 700; margin-top: 6px; }
    .sa-card-green .sa-card-value { color: #16a34a; }
    .sa-card-red .sa-card-value { color: #dc2626; }
    .sa-card-blue .sa-card-value { color: #2563eb; }
    .sa-card-orange .sa-card-value { color: #ea580c; }
    .sa-nav-links { display: flex; gap: 12px; flex-wrap: wrap; }
    .sa-nav-btn { padding: 10px 20px; background: #1e293b; color: #fff; border-radius: 6px;
      text-decoration: none; font-size: 14px; font-weight: 500; }
    .sa-nav-btn:hover { background: #334155; }
  `]
})
export class SuperAdminDashboardComponent implements OnInit {
  metrics: any = null;

  constructor(private api: SuperAdminApiService) {}

  ngOnInit(): void {
    this.api.getSaasDashboard().subscribe({
      next: (data) => this.metrics = data,
      error: () => {}
    });
  }
}
