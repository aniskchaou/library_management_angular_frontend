import { Component, OnInit } from '@angular/core';
import { SuperAdminApiService } from '../services/super-admin-api.service';

@Component({
  standalone: false,
  selector: 'app-coupons',
  template: `
    <div class="container-fluid px-4 py-3">
      <div class="d-flex justify-content-between align-items-center mb-3">
        <h4 class="mb-0">Discount Coupons</h4>
        <button class="btn btn-sm btn-primary" (click)="showForm = !showForm">
          <i class="material-icons" style="font-size:16px;vertical-align:middle">add</i> New Coupon
        </button>
      </div>

      <div class="card mb-3" *ngIf="showForm">
        <div class="card-body">
          <div class="row g-2">
            <div class="col-md-3">
              <input class="form-control form-control-sm" placeholder="Code *" [(ngModel)]="form.code">
            </div>
            <div class="col-md-3">
              <select class="form-select form-select-sm" [(ngModel)]="form.discountType">
                <option value="PERCENT">Percent (%)</option>
                <option value="FIXED_AMOUNT">Fixed Amount</option>
              </select>
            </div>
            <div class="col-md-2">
              <input class="form-control form-control-sm" placeholder="Value *" [(ngModel)]="form.discountValue" type="number">
            </div>
            <div class="col-md-2">
              <input class="form-control form-control-sm" placeholder="Max Uses" [(ngModel)]="form.maxRedemptions" type="number">
            </div>
            <div class="col-md-2">
              <input class="form-control form-control-sm" placeholder="Expires" [(ngModel)]="form.expiresAt" type="date">
            </div>
            <div class="col-12">
              <input class="form-control form-control-sm" placeholder="Description" [(ngModel)]="form.description">
            </div>
          </div>
          <div class="mt-2 d-flex gap-2">
            <button class="btn btn-sm btn-success" (click)="create()">Create</button>
            <button class="btn btn-sm btn-secondary" (click)="showForm = false">Cancel</button>
          </div>
        </div>
      </div>

      <table class="table table-hover table-sm">
        <thead class="table-light">
          <tr><th>Code</th><th>Type</th><th>Value</th><th>Redemptions</th><th>Expires</th><th>Status</th><th>Actions</th></tr>
        </thead>
        <tbody>
          <tr *ngFor="let c of coupons">
            <td><code>{{ c.code }}</code></td>
            <td>{{ c.discountType }}</td>
            <td>{{ c.discountType === 'PERCENT' ? c.discountValue + '%' : '$' + c.discountValue }}</td>
            <td>{{ c.timesRedeemed }} / {{ c.maxRedemptions ?? 'âˆž' }}</td>
            <td>{{ c.expiresAt || 'â€”' }}</td>
            <td><span class="badge" [ngClass]="c.status === 'ACTIVE' ? 'bg-success' : 'bg-secondary'">{{ c.status }}</span></td>
            <td>
              <button class="btn btn-xs btn-outline-secondary me-1" (click)="deactivate(c.id)" *ngIf="c.status === 'ACTIVE'">Deactivate</button>
              <button class="btn btn-xs btn-outline-danger" (click)="delete(c.id)">Delete</button>
            </td>
          </tr>
          <tr *ngIf="!coupons.length">
            <td colspan="7" class="text-center text-muted py-3">No coupons</td>
          </tr>
        </tbody>
      </table>
    </div>
  `
})
export class CouponsComponent implements OnInit {
  coupons: any[] = [];
  showForm = false;
  form = { code: '', discountType: 'PERCENT', discountValue: 0, maxRedemptions: null, expiresAt: null, description: '' };

  constructor(private api: SuperAdminApiService) {}

  ngOnInit() { this.load(); }

  load() { this.api.getAllCoupons().subscribe((c: any[]) => this.coupons = c); }

  create() {
    if (!this.form.code || !this.form.discountValue) return;
    this.api.createCoupon(this.form).subscribe(() => { this.showForm = false; this.load(); });
  }

  deactivate(id: number) {
    this.api.updateCoupon(id, { status: 'EXPIRED' }).subscribe(() => this.load());
  }

  delete(id: number) {
    if (confirm('Delete this coupon?')) {
      this.api.deleteCoupon(id).subscribe(() => this.load());
    }
  }
}

