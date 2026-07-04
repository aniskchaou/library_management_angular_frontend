import { Component, OnInit } from '@angular/core';
import { SuperAdminApiService } from '../../services/super-admin-api.service';

@Component({
  selector: 'app-user-management',
  template: `
    <div class="sa-page">
      <div class="sa-header">
        <h2>User Management</h2>
      </div>

      <table class="sa-table">
        <thead>
          <tr>
            <th>ID</th><th>Username</th><th>Email</th><th>Roles</th>
            <th>Status</th><th>Org ID</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let user of users">
            <td>{{ user.id }}</td>
            <td>{{ user.username }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.roles?.join(', ') }}</td>
            <td>
              <span class="badge" [class]="user.locked ? 'badge-locked' : (user.active ? 'badge-active' : 'badge-inactive')">
                {{ user.locked ? 'LOCKED' : (user.active ? 'ACTIVE' : 'INACTIVE') }}
              </span>
            </td>
            <td>{{ user.organizationId || '—' }}</td>
            <td class="actions">
              <button class="btn-sm" *ngIf="!user.locked" (click)="lock(user)">Lock</button>
              <button class="btn-sm btn-green" *ngIf="user.locked" (click)="unlock(user)">Unlock</button>
              <button class="btn-sm" (click)="resetPassword(user)">Reset PWD</button>
              <button class="btn-sm btn-orange" (click)="impersonate(user)">Impersonate</button>
              <button class="btn-sm btn-danger" (click)="deleteUser(user)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>

      <div class="sa-pagination">
        <button [disabled]="page === 0" (click)="prev()">Prev</button>
        <span>Page {{ page + 1 }}</span>
        <button [disabled]="!hasMore" (click)="next()">Next</button>
      </div>

      <div class="sa-result-banner" *ngIf="resultMsg">{{ resultMsg }}</div>
    </div>
  `,
  styles: [`
    .sa-page { padding: 24px; }
    .sa-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; }
    .sa-table { width: 100%; border-collapse: collapse; font-size: 14px; }
    .sa-table th, .sa-table td { padding: 10px 12px; border-bottom: 1px solid #e5e7eb; text-align: left; }
    .sa-table th { background: #f8fafc; font-weight: 600; }
    .badge { padding: 2px 8px; border-radius: 12px; font-size: 12px; font-weight: 600; }
    .badge-active { background: #dcfce7; color: #16a34a; }
    .badge-inactive { background: #f1f5f9; color: #64748b; }
    .badge-locked { background: #fee2e2; color: #dc2626; }
    .actions { display: flex; gap: 4px; flex-wrap: wrap; }
    .btn-sm { padding: 4px 8px; font-size: 11px; border: 1px solid #d1d5db; border-radius: 4px; cursor: pointer; }
    .btn-green { background: #dcfce7; border-color: #16a34a; color: #16a34a; }
    .btn-danger { background: #fee2e2; border-color: #dc2626; color: #dc2626; }
    .btn-orange { background: #fff7ed; border-color: #ea580c; color: #ea580c; }
    .sa-pagination { display: flex; gap: 12px; align-items: center; margin-top: 16px; }
    .sa-result-banner { margin-top: 16px; padding: 12px 16px; background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 6px; color: #15803d; font-size: 14px; }
  `]
})
export class UserManagementComponent implements OnInit {
  users: any[] = [];
  page = 0;
  hasMore = false;
  resultMsg = '';

  constructor(private api: SuperAdminApiService) {}

  ngOnInit(): void { this.load(); }

  load(): void {
    this.api.getUsers(this.page).subscribe((res: any) => {
      this.users = res.content || res;
      this.hasMore = res.content ? !res.last : false;
    });
  }

  lock(user: any): void {
    const reason = prompt('Lock reason?') || '';
    this.api.lockUser(user.id, reason).subscribe(() => this.load());
  }

  unlock(user: any): void {
    this.api.unlockUser(user.id).subscribe(() => this.load());
  }

  resetPassword(user: any): void {
    if (confirm(`Reset password for ${user.username}?`)) {
      this.api.resetUserPassword(user.id).subscribe((r: any) => {
        this.resultMsg = `Temp password for ${user.username}: ${r.tempPassword} — share securely!`;
        setTimeout(() => this.resultMsg = '', 15000);
      });
    }
  }

  impersonate(user: any): void {
    this.api.impersonateUser(user.id).subscribe((r: any) => {
      this.resultMsg = `Impersonating ${user.username}. ${r.note}`;
    });
  }

  deleteUser(user: any): void {
    if (confirm(`Permanently delete user "${user.username}"?`)) {
      this.api.deleteUser(user.id).subscribe(() => this.load());
    }
  }

  prev(): void { if (this.page > 0) { this.page--; this.load(); } }
  next(): void { this.page++; this.load(); }
}
