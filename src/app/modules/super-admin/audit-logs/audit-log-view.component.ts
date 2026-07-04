import { Component, OnInit } from '@angular/core';
import { SuperAdminApiService } from '../services/super-admin-api.service';

@Component({
  standalone: false,
  selector: 'app-audit-log-view',
  template: `
    <div class="sa-page">
      <div class="sa-header">
        <h2>Audit Logs</h2>
        <div class="filters">
          <input type="number" [(ngModel)]="filterOrgId" placeholder="Filter by Org ID" (change)="load()" />
          <button class="btn-sm" (click)="filterOrgId = null; load()">Clear</button>
        </div>
      </div>

      <table class="sa-table">
        <thead>
          <tr>
            <th>Time</th><th>Action</th><th>Entity</th><th>Actor</th><th>Org</th><th>Description</th><th>IP</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let log of logs">
            <td class="nowrap">{{ log.createdAt | date:'short' }}</td>
            <td><span class="badge action-badge">{{ log.action }}</span></td>
            <td>{{ log.entityType }}<br><small>#{{ log.entityId }}</small></td>
            <td>{{ log.actorUsername }}</td>
            <td>{{ log.organizationId || '—' }}</td>
            <td class="desc">{{ log.description }}</td>
            <td>{{ log.ipAddress || '—' }}</td>
          </tr>
        </tbody>
      </table>

      <div class="sa-pagination">
        <button [disabled]="page === 0" (click)="prev()">Prev</button>
        <span>Page {{ page + 1 }}</span>
        <button [disabled]="!hasMore" (click)="next()">Next</button>
      </div>
    </div>
  `,
  styles: [`
    .sa-page { padding: 24px; }
    .sa-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; }
    .filters { display: flex; gap: 8px; align-items: center; }
    .filters input { padding: 6px 8px; border: 1px solid #d1d5db; border-radius: 4px; font-size: 13px; }
    .sa-table { width: 100%; border-collapse: collapse; font-size: 13px; }
    .sa-table th, .sa-table td { padding: 8px 10px; border-bottom: 1px solid #e5e7eb; text-align: left; }
    .sa-table th { background: #f8fafc; font-weight: 600; }
    .nowrap { white-space: nowrap; }
    .desc { max-width: 300px; word-wrap: break-word; color: #475569; }
    .badge { padding: 2px 7px; border-radius: 10px; font-size: 11px; font-weight: 600; background: #eff6ff; color: #2563eb; }
    .sa-pagination { display: flex; gap: 12px; align-items: center; margin-top: 16px; }
    .btn-sm { padding: 4px 10px; font-size: 12px; border: 1px solid #d1d5db; border-radius: 4px; cursor: pointer; }
    small { color: #94a3b8; }
  `]
})
export class AuditLogViewComponent implements OnInit {
  logs: any[] = [];
  page = 0;
  hasMore = false;
  filterOrgId: number | null = null;

  constructor(private api: SuperAdminApiService) {}

  ngOnInit(): void { this.load(); }

  load(): void {
    const req = this.filterOrgId
      ? this.api.getAuditLogsByOrg(this.filterOrgId, this.page)
      : this.api.getAuditLogs(this.page);
    req.subscribe((res: any) => {
      this.logs = res.content || res;
      this.hasMore = res.content ? !res.last : false;
    });
  }

  prev(): void { if (this.page > 0) { this.page--; this.load(); } }
  next(): void { this.page++; this.load(); }
}
