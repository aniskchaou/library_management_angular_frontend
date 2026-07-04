import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import CONFIG from 'src/app/main/urls/urls';

interface AuditEvent {
  id: number;
  action: string;
  entityType: string;
  entityId: number;
  actorUsername: string;
  description: string;
  ipAddress: string;
  createdAt: string;
}

@Component({
  selector: 'app-activity-timeline',
  templateUrl: './activity-timeline.component.html',
  styleUrls: ['./activity-timeline.component.css'],
  standalone: false,
})
export class ActivityTimelineComponent implements OnInit {

  events: AuditEvent[] = [];
  loading = false;
  page = 0;
  pageSize = 30;
  totalPages = 1;
  filterAction = '';
  filterUser   = '';

  readonly actionOptions = [
    '', 'CREATE', 'UPDATE', 'DELETE', 'LOGIN', 'LOGOUT',
    'SUSPEND', 'ACTIVATE', 'LOCK_USER', 'UNLOCK_USER',
    'RESET_PASSWORD', 'ASSIGN_PLAN', 'STRIPE_EVENT'
  ];

  private get headers(): HttpHeaders {
    return new HttpHeaders({ Authorization: 'Basic ' + btoa('admin:admin') });
  }

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.loading = true;
    const url = `${CONFIG.URL_BASE}/api/super-admin/audit-logs?page=${this.page}&size=${this.pageSize}`;
    this.http.get<any>(url, { headers: this.headers }).subscribe({
      next: data => {
        this.events = (data?.content ?? data ?? []).filter((e: AuditEvent) => {
          const matchAction = !this.filterAction || e.action === this.filterAction;
          const matchUser   = !this.filterUser   ||
            (e.actorUsername ?? '').toLowerCase().includes(this.filterUser.toLowerCase());
          return matchAction && matchUser;
        });
        this.totalPages = data?.totalPages ?? 1;
        this.loading = false;
      },
      error: () => { this.loading = false; }
    });
  }

  applyFilter(): void {
    this.page = 0;
    this.load();
  }

  clearFilter(): void {
    this.filterAction = '';
    this.filterUser   = '';
    this.load();
  }

  prevPage(): void { if (this.page > 0) { this.page--; this.load(); } }
  nextPage(): void { if (this.page < this.totalPages - 1) { this.page++; this.load(); } }

  iconForAction(action: string): string {
    const map: Record<string, string> = {
      CREATE: 'add_circle',
      UPDATE: 'edit',
      DELETE: 'delete',
      LOGIN:  'login',
      LOGOUT: 'logout',
      SUSPEND: 'pause_circle',
      ACTIVATE: 'check_circle',
      LOCK_USER: 'lock',
      UNLOCK_USER: 'lock_open',
      RESET_PASSWORD: 'key',
      ASSIGN_PLAN: 'assignment',
      STRIPE_EVENT: 'payment',
    };
    return map[action] ?? 'circle';
  }

  colorForAction(action: string): string {
    const map: Record<string, string> = {
      CREATE: '#22c55e',
      UPDATE: '#3b82f6',
      DELETE: '#ef4444',
      LOGIN:  '#8b5cf6',
      LOGOUT: '#6b7280',
      SUSPEND: '#f59e0b',
      ACTIVATE: '#22c55e',
      LOCK_USER: '#ef4444',
      UNLOCK_USER: '#22c55e',
      RESET_PASSWORD: '#f59e0b',
      STRIPE_EVENT: '#0ea5e9',
    };
    return map[action] ?? '#6b7280';
  }
}
