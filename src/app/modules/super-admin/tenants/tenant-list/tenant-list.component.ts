import { Component, OnInit } from '@angular/core';
import { SuperAdminApiService } from '../../services/super-admin-api.service';

@Component({
  selector: 'app-tenant-list',
  template: `
    <div class="sa-page">
      <div class="sa-header">
        <h2>Organizations (Tenants)</h2>
        <button class="btn-primary" (click)="showCreate = true">+ New Organization</button>
      </div>

      <!-- Create form -->
      <div class="sa-modal-overlay" *ngIf="showCreate">
        <div class="sa-modal">
          <h3>Create Organization</h3>
          <label>Name <input [(ngModel)]="newOrg.name" placeholder="Library Name" /></label>
          <label>Subdomain <input [(ngModel)]="newOrg.subdomain" placeholder="my-library" /></label>
          <label>Contact Email <input [(ngModel)]="newOrg.contactEmail" placeholder="admin@library.com" /></label>
          <div class="sa-modal-actions">
            <button class="btn-primary" (click)="createOrg()">Create</button>
            <button class="btn-secondary" (click)="showCreate = false">Cancel</button>
          </div>
          <p class="error" *ngIf="createError">{{ createError }}</p>
        </div>
      </div>

      <!-- Stats -->
      <div class="sa-stats" *ngIf="stats">
        <span>Total: <b>{{ stats.total }}</b></span>
        <span>Active: <b class="green">{{ stats.active }}</b></span>
        <span>Suspended: <b class="red">{{ stats.suspended }}</b></span>
      </div>

      <!-- Table -->
      <table class="sa-table">
        <thead>
          <tr>
            <th>ID</th><th>Name</th><th>Subdomain</th>
            <th>Status</th><th>Contact</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let org of orgs">
            <td>{{ org.id }}</td>
            <td><a routerLink="/super-admin/tenants/{{ org.id }}">{{ org.name }}</a></td>
            <td>{{ org.subdomain }}</td>
            <td><span class="badge" [class]="'badge-' + org.status.toLowerCase()">{{ org.status }}</span></td>
            <td>{{ org.contactEmail }}</td>
            <td class="actions">
              <button class="btn-sm" *ngIf="org.status !== 'SUSPENDED'" (click)="suspend(org)">Suspend</button>
              <button class="btn-sm btn-green" *ngIf="org.status === 'SUSPENDED'" (click)="activate(org)">Activate</button>
              <button class="btn-sm btn-danger" (click)="delete(org)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Pagination -->
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
    .sa-stats { display: flex; gap: 20px; margin-bottom: 16px; font-size: 14px; }
    .green { color: #16a34a; } .red { color: #dc2626; }
    .sa-table { width: 100%; border-collapse: collapse; font-size: 14px; }
    .sa-table th, .sa-table td { padding: 10px 12px; border-bottom: 1px solid #e5e7eb; text-align: left; }
    .sa-table th { background: #f8fafc; font-weight: 600; }
    .badge { padding: 2px 8px; border-radius: 12px; font-size: 12px; font-weight: 600; }
    .badge-active { background: #dcfce7; color: #16a34a; }
    .badge-suspended { background: #fee2e2; color: #dc2626; }
    .badge-pending { background: #fef9c3; color: #ca8a04; }
    .badge-deleted { background: #f1f5f9; color: #64748b; }
    .actions { display: flex; gap: 6px; }
    .btn-sm { padding: 4px 10px; font-size: 12px; border: 1px solid #d1d5db; border-radius: 4px; cursor: pointer; }
    .btn-green { background: #dcfce7; border-color: #16a34a; color: #16a34a; }
    .btn-danger { background: #fee2e2; border-color: #dc2626; color: #dc2626; }
    .btn-primary { padding: 8px 16px; background: #1e293b; color: #fff; border: none; border-radius: 6px; cursor: pointer; }
    .btn-secondary { padding: 8px 16px; background: #f1f5f9; color: #334155; border: 1px solid #cbd5e1; border-radius: 6px; cursor: pointer; }
    .sa-pagination { display: flex; gap: 12px; align-items: center; margin-top: 16px; }
    .sa-modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,.5); display: flex; align-items: center; justify-content: center; z-index: 1000; }
    .sa-modal { background: #fff; border-radius: 10px; padding: 28px; min-width: 360px; display: flex; flex-direction: column; gap: 12px; }
    .sa-modal label { display: flex; flex-direction: column; gap: 4px; font-size: 13px; }
    .sa-modal input { padding: 8px; border: 1px solid #d1d5db; border-radius: 4px; }
    .sa-modal-actions { display: flex; gap: 8px; margin-top: 8px; }
    .error { color: #dc2626; font-size: 13px; }
  `]
})
export class TenantListComponent implements OnInit {
  orgs: any[] = [];
  stats: any = null;
  page = 0;
  hasMore = false;
  showCreate = false;
  createError = '';
  newOrg: any = { name: '', subdomain: '', contactEmail: '' };

  constructor(private api: SuperAdminApiService) {}

  ngOnInit(): void {
    this.load();
    this.api.getOrgStats().subscribe(s => this.stats = s);
  }

  load(): void {
    this.api.getOrganizations(this.page).subscribe((res: any) => {
      this.orgs = res.content || res;
      this.hasMore = res.content ? !res.last : false;
    });
  }

  createOrg(): void {
    this.createError = '';
    this.api.createOrganization(this.newOrg).subscribe({
      next: () => { this.showCreate = false; this.newOrg = {}; this.load(); },
      error: (e) => this.createError = e.error?.error || 'Failed to create'
    });
  }

  suspend(org: any): void {
    const reason = prompt('Reason for suspension?') || '';
    this.api.suspendOrganization(org.id, reason).subscribe(() => this.load());
  }

  activate(org: any): void {
    this.api.activateOrganization(org.id).subscribe(() => this.load());
  }

  delete(org: any): void {
    if (confirm(`Delete organization "${org.name}"?`)) {
      this.api.deleteOrganization(org.id).subscribe(() => this.load());
    }
  }

  prev(): void { if (this.page > 0) { this.page--; this.load(); } }
  next(): void { this.page++; this.load(); }
}
