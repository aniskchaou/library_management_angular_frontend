import { Component, OnInit } from '@angular/core';
import { SuperAdminApiService } from '../services/super-admin-api.service';

@Component({
  standalone: false,
  selector: 'app-monitoring',
  template: `
    <div class="container-fluid px-4 py-3">
      <h4 class="mb-3">Platform Monitoring</h4>

      <ul class="nav nav-tabs mb-3">
        <li class="nav-item" *ngFor="let tab of tabs">
          <a class="nav-link" [class.active]="activeTab === tab.id" (click)="switchTab(tab.id)" href="javascript:void(0)">
            {{ tab.label }}
          </a>
        </li>
      </ul>

      <!-- System Health -->
      <div *ngIf="activeTab === 'health'">
        <div *ngIf="health" class="row g-3">
          <div class="col-md-3">
            <div class="card text-center" [ngClass]="health.status === 'UP' ? 'border-success' : 'border-danger'">
              <div class="card-body">
                <div class="fs-5 fw-bold" [ngClass]="health.status === 'UP' ? 'text-success' : 'text-danger'">{{ health.status }}</div>
                <small class="text-muted">Overall Status</small>
              </div>
            </div>
          </div>
          <div class="col-md-3">
            <div class="card text-center" [ngClass]="health.database === 'UP' ? 'border-success' : 'border-danger'">
              <div class="card-body">
                <div class="fs-5 fw-bold">{{ health.database }}</div>
                <small class="text-muted">Database</small>
              </div>
            </div>
          </div>
          <div class="col-md-3">
            <div class="card text-center">
              <div class="card-body">
                <div class="fs-5 fw-bold">{{ health.requests24h | number }}</div>
                <small class="text-muted">Requests (24h)</small>
              </div>
            </div>
          </div>
          <div class="col-md-3">
            <div class="card text-center">
              <div class="card-body">
                <div class="fs-5 fw-bold text-warning">{{ health.errors24h | number }}</div>
                <small class="text-muted">Errors (24h)</small>
              </div>
            </div>
          </div>
          <div class="col-md-3">
            <div class="card text-center">
              <div class="card-body">
                <div class="fs-5 fw-bold">{{ health.avgResponseMs }}ms</div>
                <small class="text-muted">Avg Response Time</small>
              </div>
            </div>
          </div>
          <div class="col-md-3" *ngIf="health.jvm">
            <div class="card text-center">
              <div class="card-body">
                <div class="fs-5 fw-bold">{{ health.jvm.heapUsedMb }}MB / {{ health.jvm.heapMaxMb }}MB</div>
                <small class="text-muted">JVM Heap</small>
              </div>
            </div>
          </div>
        </div>
        <div *ngIf="!health" class="text-center py-4"><div class="spinner-border"></div></div>
      </div>

      <!-- API Requests -->
      <div *ngIf="activeTab === 'api'">
        <div class="mb-3">
          <h6>Top Endpoints (7 days)</h6>
          <table class="table table-sm table-bordered">
            <thead class="table-light"><tr><th>Path</th><th>Requests</th></tr></thead>
            <tbody>
              <tr *ngFor="let e of topEndpoints">
                <td><code>{{ e.path }}</code></td>
                <td>{{ e.count | number }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <h6>Recent Requests</h6>
        <table class="table table-sm table-hover">
          <thead class="table-light">
            <tr><th>Method</th><th>Path</th><th>Status</th><th>Duration</th><th>User</th><th>IP</th><th>Time</th></tr>
          </thead>
          <tbody>
            <tr *ngFor="let r of apiRequests?.content">
              <td><span class="badge" [ngClass]="methodClass(r.method)">{{ r.method }}</span></td>
              <td><small>{{ r.path }}</small></td>
              <td>
                <span class="badge" [ngClass]="r.statusCode >= 400 ? 'bg-danger' : 'bg-success'">{{ r.statusCode }}</span>
              </td>
              <td>{{ r.durationMs }}ms</td>
              <td>{{ r.username || 'â€”' }}</td>
              <td>{{ r.ipAddress }}</td>
              <td><small>{{ r.createdAt | date:'short' }}</small></td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Security Events / Login History -->
      <div *ngIf="activeTab === 'security'">
        <div class="input-group mb-3" style="max-width:300px">
          <input class="form-control form-control-sm" placeholder="Filter by username" [(ngModel)]="loginFilter" (keyup.enter)="loadLoginHistory()">
          <button class="btn btn-sm btn-outline-secondary" (click)="loadLoginHistory()">Search</button>
        </div>
        <table class="table table-sm table-hover">
          <thead class="table-light">
            <tr><th>Action</th><th>Actor</th><th>Description</th><th>IP</th><th>Time</th></tr>
          </thead>
          <tbody>
            <tr *ngFor="let l of securityLogs?.content">
              <td><span class="badge bg-secondary">{{ l.action }}</span></td>
              <td>{{ l.actorUsername }}</td>
              <td>{{ l.description }}</td>
              <td>{{ l.ipAddress }}</td>
              <td><small>{{ l.createdAt | date:'short' }}</small></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `
})
export class MonitoringComponent implements OnInit {
  activeTab = 'health';
  health: any = null;
  topEndpoints: any[] = [];
  apiRequests: any = null;
  securityLogs: any = null;
  loginFilter = '';

  tabs = [
    { id: 'health', label: 'System Health' },
    { id: 'api', label: 'API Monitoring' },
    { id: 'security', label: 'Security Events' }
  ];

  constructor(private api: SuperAdminApiService) {}

  ngOnInit() { this.switchTab('health'); }

  switchTab(tab: string) {
    this.activeTab = tab;
    if (tab === 'health') this.loadHealth();
    else if (tab === 'api') this.loadApiData();
    else if (tab === 'security') this.loadLoginHistory();
  }

  loadHealth() {
    this.api.getSystemHealth().subscribe(h => this.health = h);
  }

  loadApiData() {
    this.api.getTopEndpoints().subscribe(e => this.topEndpoints = e);
    this.api.getApiRequests(0, 50).subscribe(r => this.apiRequests = r);
  }

  loadLoginHistory() {
    this.api.getSecurityEvents(0, 50).subscribe(l => this.securityLogs = l);
  }

  methodClass(method: string): string {
    const m: any = { GET: 'bg-primary', POST: 'bg-success', PUT: 'bg-warning text-dark', DELETE: 'bg-danger', PATCH: 'bg-info' };
    return m[method] || 'bg-secondary';
  }
}

