import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SuperAdminApiService } from '../../services/super-admin-api.service';

@Component({
  selector: 'app-tenant-detail',
  template: `
    <div class="sa-page" *ngIf="org">
      <div class="sa-header">
        <h2>{{ org.name }}</h2>
        <div class="actions">
          <span class="badge" [class]="'badge-' + org.status.toLowerCase()">{{ org.status }}</span>
          <button class="btn-sm" *ngIf="org.status !== 'SUSPENDED'" (click)="suspend()">Suspend</button>
          <button class="btn-sm btn-green" *ngIf="org.status === 'SUSPENDED'" (click)="activate()">Activate</button>
        </div>
      </div>

      <div class="sa-detail-grid">
        <div class="sa-detail-section">
          <h3>Details</h3>
          <div class="detail-row"><span>Subdomain:</span><b>{{ org.subdomain }}</b></div>
          <div class="detail-row"><span>Email:</span><b>{{ org.contactEmail }}</b></div>
          <div class="detail-row"><span>Phone:</span><b>{{ org.contactPhone || '—' }}</b></div>
          <div class="detail-row"><span>Address:</span><b>{{ org.address || '—' }}</b></div>
          <div class="detail-row"><span>Created:</span><b>{{ org.createdAt | date }}</b></div>
          <div class="detail-row" *ngIf="org.suspendedAt">
            <span>Suspended:</span><b>{{ org.suspendedAt | date }}</b>
          </div>
          <div class="detail-row" *ngIf="org.suspendReason">
            <span>Reason:</span><b>{{ org.suspendReason }}</b>
          </div>
          <div class="detail-row"><span>Stripe ID:</span><b>{{ org.stripeCustomerId || '—' }}</b></div>
        </div>

        <div class="sa-detail-section">
          <h3>Subscription</h3>
          <div *ngIf="subscription">
            <div class="detail-row"><span>Plan:</span><b>{{ subscription.planId }}</b></div>
            <div class="detail-row"><span>Status:</span><b>{{ subscription.status }}</b></div>
            <div class="detail-row"><span>Cycle:</span><b>{{ subscription.billingCycle }}</b></div>
            <div class="detail-row"><span>Amount:</span><b>\${{ subscription.amount }}</b></div>
            <div class="detail-row"><span>Renews:</span><b>{{ subscription.currentPeriodEnd | date }}</b></div>
          </div>
          <p *ngIf="!subscription" class="muted">No active subscription</p>

          <h4>Assign Plan</h4>
          <select [(ngModel)]="selectedPlanId">
            <option *ngFor="let p of plans" [value]="p.id">{{ p.name }}</option>
          </select>
          <select [(ngModel)]="selectedCycle">
            <option value="MONTHLY">Monthly</option>
            <option value="YEARLY">Yearly</option>
          </select>
          <button class="btn-primary btn-sm" (click)="assignPlan()">Create Checkout Link</button>
          <p *ngIf="checkoutUrl">
            <a [href]="checkoutUrl" target="_blank">Open Stripe Checkout</a>
          </p>
        </div>

        <div class="sa-detail-section">
          <h3>Transfer Ownership</h3>
          <input type="number" [(ngModel)]="newOwnerId" placeholder="New owner User ID" />
          <button class="btn-primary btn-sm" (click)="transfer()">Transfer</button>
        </div>
      </div>

      <a routerLink="/super-admin/tenants" class="back-link">← Back to Tenants</a>
    </div>
    <div *ngIf="!org" class="sa-loading">Loading...</div>
  `,
  styles: [`
    .sa-page { padding: 24px; }
    .sa-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; }
    .sa-detail-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px; }
    .sa-detail-section { background: #fff; border: 1px solid #e5e7eb; border-radius: 8px; padding: 20px; }
    .sa-detail-section h3 { margin: 0 0 12px; font-size: 15px; font-weight: 600; }
    .sa-detail-section h4 { margin: 16px 0 8px; font-size: 13px; color: #64748b; }
    .detail-row { display: flex; gap: 8px; padding: 4px 0; font-size: 14px; }
    .detail-row span { color: #64748b; min-width: 90px; }
    .muted { color: #94a3b8; font-size: 13px; }
    .actions { display: flex; gap: 8px; align-items: center; }
    .badge { padding: 2px 8px; border-radius: 12px; font-size: 12px; font-weight: 600; }
    .badge-active { background: #dcfce7; color: #16a34a; }
    .badge-suspended { background: #fee2e2; color: #dc2626; }
    .btn-sm { padding: 4px 10px; font-size: 12px; border: 1px solid #d1d5db; border-radius: 4px; cursor: pointer; }
    .btn-green { background: #dcfce7; border-color: #16a34a; color: #16a34a; }
    .btn-primary { background: #1e293b; color: #fff; border: none; border-radius: 6px; cursor: pointer; }
    select, input[type=number] { padding: 6px 8px; border: 1px solid #d1d5db; border-radius: 4px; margin-right: 6px; margin-bottom: 8px; }
    .back-link { display: inline-block; margin-top: 24px; color: #2563eb; text-decoration: none; font-size: 14px; }
    .sa-loading { padding: 40px; text-align: center; color: #94a3b8; }
  `]
})
export class TenantDetailComponent implements OnInit {
  org: any = null;
  subscription: any = null;
  plans: any[] = [];
  selectedPlanId: number | null = null;
  selectedCycle = 'MONTHLY';
  newOwnerId: number | null = null;
  checkoutUrl: string | null = null;

  constructor(private route: ActivatedRoute, private api: SuperAdminApiService) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.api.getOrganization(id).subscribe(o => this.org = o);
    this.api.getPlans().subscribe(p => { this.plans = p; if (p.length) this.selectedPlanId = p[0].id; });
  }

  suspend(): void {
    const reason = prompt('Reason for suspension?') || '';
    this.api.suspendOrganization(this.org.id, reason).subscribe(
      () => this.api.getOrganization(this.org.id).subscribe(o => this.org = o)
    );
  }

  activate(): void {
    this.api.activateOrganization(this.org.id).subscribe(
      () => this.api.getOrganization(this.org.id).subscribe(o => this.org = o)
    );
  }

  assignPlan(): void {
    this.api.createCheckoutSession(this.org.id, this.selectedPlanId!, this.selectedCycle)
      .subscribe(r => this.checkoutUrl = r.url);
  }

  transfer(): void {
    if (this.newOwnerId) {
      this.api.transferOwnership(this.org.id, this.newOwnerId).subscribe(
        () => alert('Ownership transferred')
      );
    }
  }
}
