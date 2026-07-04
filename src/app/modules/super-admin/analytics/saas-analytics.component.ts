import { Component, OnInit } from '@angular/core';
import { SuperAdminApiService } from '../services/super-admin-api.service';

@Component({
  standalone: false,
  selector: 'app-saas-analytics',
  template: `
    <div class="sa-page">
      <h2>SaaS Analytics</h2>

      <div class="sa-cards" *ngIf="data">
        <div class="sa-card sa-card-blue">
          <div class="sa-card-label">MRR</div>
          <div class="sa-card-value">\${{ data.mrr | number:'1.2-2' }}</div>
        </div>
        <div class="sa-card sa-card-blue">
          <div class="sa-card-label">ARR</div>
          <div class="sa-card-value">\${{ data.arr | number:'1.2-2' }}</div>
        </div>
        <div class="sa-card sa-card-green">
          <div class="sa-card-label">Active Organizations</div>
          <div class="sa-card-value">{{ data.activeOrganizations }}</div>
        </div>
        <div class="sa-card">
          <div class="sa-card-label">Total Organizations</div>
          <div class="sa-card-value">{{ data.totalOrganizations }}</div>
        </div>
        <div class="sa-card">
          <div class="sa-card-label">Total Users</div>
          <div class="sa-card-value">{{ data.totalUsers }}</div>
        </div>
        <div class="sa-card">
          <div class="sa-card-label">Active Subscriptions</div>
          <div class="sa-card-value">{{ data.activeSubscriptions }}</div>
        </div>
        <div class="sa-card sa-card-orange">
          <div class="sa-card-label">Churn (7d)</div>
          <div class="sa-card-value">{{ data.churnLast7Days }}</div>
        </div>
        <div class="sa-card sa-card-orange">
          <div class="sa-card-label">Churn (30d)</div>
          <div class="sa-card-value">{{ data.churnLast30Days }}</div>
        </div>
        <div class="sa-card sa-card-red">
          <div class="sa-card-label">Suspended Orgs</div>
          <div class="sa-card-value">{{ data.suspendedOrganizations }}</div>
        </div>
      </div>

      <div *ngIf="!data" class="loading">Loading analytics...</div>
    </div>
  `,
  styles: [`
    .sa-page { padding: 24px; }
    h2 { margin-bottom: 24px; font-size: 22px; font-weight: 700; }
    .sa-cards { display: flex; flex-wrap: wrap; gap: 16px; }
    .sa-card { background: #fff; border: 1px solid #e0e0e0; border-radius: 8px;
      padding: 20px 28px; min-width: 160px; box-shadow: 0 1px 4px rgba(0,0,0,.06); }
    .sa-card-label { font-size: 12px; color: #888; text-transform: uppercase; letter-spacing: .5px; }
    .sa-card-value { font-size: 28px; font-weight: 700; margin-top: 6px; }
    .sa-card-green .sa-card-value { color: #16a34a; }
    .sa-card-red .sa-card-value { color: #dc2626; }
    .sa-card-blue .sa-card-value { color: #2563eb; }
    .sa-card-orange .sa-card-value { color: #ea580c; }
    .loading { color: #94a3b8; padding: 40px; }
  `]
})
export class SaasAnalyticsComponent implements OnInit {
  data: any = null;

  constructor(private api: SuperAdminApiService) {}

  ngOnInit(): void {
    this.api.getSaasDashboard().subscribe(d => this.data = d);
  }
}
