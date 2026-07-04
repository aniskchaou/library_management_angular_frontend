import { Component, OnInit } from '@angular/core';
import { SuperAdminApiService } from '../services/super-admin-api.service';

@Component({
  standalone: false,
  selector: 'app-invoices',
  template: `
    <div class="container-fluid px-4 py-3">
      <div class="d-flex justify-content-between align-items-center mb-3">
        <h4 class="mb-0">Billing Invoices</h4>
        <div class="input-group" style="max-width:250px">
          <input class="form-control form-control-sm" placeholder="Org ID filter" type="number"
            [(ngModel)]="orgFilter" (change)="load()">
          <button class="btn btn-sm btn-outline-secondary" (click)="orgFilter=null; load()">Clear</button>
        </div>
      </div>
      <table class="table table-hover table-sm">
        <thead class="table-light">
          <tr>
            <th>Stripe ID</th><th>Org</th><th>Amount</th><th>Paid</th><th>Currency</th>
            <th>Status</th><th>Period</th><th>Links</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let inv of invoices?.content">
            <td><small><code>{{ inv.stripeInvoiceId }}</code></small></td>
            <td>{{ inv.organizationId }}</td>
            <td>{{ inv.amount | currency:inv.currency:'symbol':'1.2-2' }}</td>
            <td>{{ inv.amountPaid | currency:inv.currency:'symbol':'1.2-2' }}</td>
            <td>{{ inv.currency | uppercase }}</td>
            <td>
              <span class="badge" [ngClass]="statusClass(inv.status)">{{ inv.status }}</span>
            </td>
            <td><small>{{ inv.periodStart | date:'mediumDate' }} â€“ {{ inv.periodEnd | date:'mediumDate' }}</small></td>
            <td>
              <a *ngIf="inv.stripeHostedUrl" [href]="inv.stripeHostedUrl" target="_blank" class="btn btn-xs btn-outline-primary me-1">View</a>
              <a *ngIf="inv.stripePdfUrl" [href]="inv.stripePdfUrl" target="_blank" class="btn btn-xs btn-outline-secondary">PDF</a>
            </td>
          </tr>
          <tr *ngIf="!invoices?.content?.length">
            <td colspan="8" class="text-center text-muted py-3">No invoices found</td>
          </tr>
        </tbody>
      </table>
      <!-- Pagination -->
      <div class="d-flex gap-2" *ngIf="invoices?.totalPages > 1">
        <button class="btn btn-sm btn-outline-secondary" [disabled]="page === 0" (click)="page=page-1; load()">Prev</button>
        <span class="align-self-center">Page {{ page+1 }} / {{ invoices?.totalPages }}</span>
        <button class="btn btn-sm btn-outline-secondary" [disabled]="page >= invoices?.totalPages-1" (click)="page=page+1; load()">Next</button>
      </div>
    </div>
  `
})
export class InvoicesComponent implements OnInit {
  invoices: any = null;
  orgFilter: number | null = null;
  page = 0;

  constructor(private api: SuperAdminApiService) {}

  ngOnInit() { this.load(); }

  load() {
    const obs = this.orgFilter
      ? this.api.getInvoicesByOrg(this.orgFilter, this.page)
      : this.api.getAllInvoices(this.page);
    obs.subscribe(i => this.invoices = i);
  }

  statusClass(s: string): string {
    const m: any = { PAID: 'bg-success', OPEN: 'bg-warning text-dark', VOID: 'bg-secondary',
                     DRAFT: 'bg-light text-dark', UNCOLLECTIBLE: 'bg-danger' };
    return m[s] || 'bg-secondary';
  }
}

