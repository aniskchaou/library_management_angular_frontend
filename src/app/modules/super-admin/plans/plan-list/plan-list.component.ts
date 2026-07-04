import { Component, OnInit } from '@angular/core';
import { SuperAdminApiService } from '../../services/super-admin-api.service';

@Component({
  selector: 'app-plan-list',
  template: `
    <div class="sa-page">
      <div class="sa-header">
        <h2>Subscription Plans</h2>
        <button class="btn-primary" (click)="showForm = true; editPlan = null; resetForm()">+ New Plan</button>
      </div>

      <div class="sa-modal-overlay" *ngIf="showForm">
        <div class="sa-modal" [formGroup]="form" *ngIf="!editPlan; else editBlock">
          <ng-container [ngTemplateOutlet]="formFields"></ng-container>
        </div>
        <ng-template #editBlock>
          <div class="sa-modal">
            <ng-container [ngTemplateOutlet]="formFields"></ng-container>
          </div>
        </ng-template>
      </div>

      <ng-template #formFields>
        <h3>{{ editPlan ? 'Edit Plan' : 'New Plan' }}</h3>
        <label>Name <input [(ngModel)]="formData.name" /></label>
        <label>Description <input [(ngModel)]="formData.description" /></label>
        <label>Monthly Price (\$) <input type="number" [(ngModel)]="formData.priceMonthly" /></label>
        <label>Yearly Price (\$) <input type="number" [(ngModel)]="formData.priceYearly" /></label>
        <label>Max Users <input type="number" [(ngModel)]="formData.maxUsers" /></label>
        <label>Max Books <input type="number" [(ngModel)]="formData.maxBooks" /></label>
        <label>Max Storage (GB) <input type="number" [(ngModel)]="formData.maxStorageGb" /></label>
        <div class="checkboxes">
          <label><input type="checkbox" [(ngModel)]="formData.canUseAnalytics" /> Analytics</label>
          <label><input type="checkbox" [(ngModel)]="formData.canUseApi" /> API Access</label>
          <label><input type="checkbox" [(ngModel)]="formData.canUseSso" /> SSO</label>
          <label><input type="checkbox" [(ngModel)]="formData.canUseCustomBranding" /> Custom Branding</label>
        </div>
        <label>Stripe Monthly Price ID <input [(ngModel)]="formData.stripePriceIdMonthly" /></label>
        <label>Stripe Yearly Price ID <input [(ngModel)]="formData.stripePriceIdYearly" /></label>
        <div class="sa-modal-actions">
          <button class="btn-primary" (click)="save()">{{ editPlan ? 'Update' : 'Create' }}</button>
          <button class="btn-secondary" (click)="showForm = false">Cancel</button>
        </div>
      </ng-template>

      <div class="plan-grid">
        <div class="plan-card" *ngFor="let plan of plans">
          <div class="plan-header">
            <span class="plan-name">{{ plan.name }}</span>
            <span class="badge" [class]="plan.active ? 'badge-active' : 'badge-inactive'">
              {{ plan.active ? 'Active' : 'Inactive' }}
            </span>
          </div>
          <div class="plan-price">
            \${{ plan.priceMonthly }}<span>/mo</span> &nbsp; \${{ plan.priceYearly }}<span>/yr</span>
          </div>
          <div class="plan-limits">
            <span>👥 {{ plan.maxUsers }} users</span>
            <span>📚 {{ plan.maxBooks }} books</span>
            <span>💾 {{ plan.maxStorageGb }}GB</span>
          </div>
          <div class="plan-features">
            <span *ngIf="plan.canUseAnalytics" class="feature">✓ Analytics</span>
            <span *ngIf="plan.canUseApi" class="feature">✓ API</span>
            <span *ngIf="plan.canUseSso" class="feature">✓ SSO</span>
            <span *ngIf="plan.canUseCustomBranding" class="feature">✓ Branding</span>
          </div>
          <div class="plan-actions">
            <button class="btn-sm" (click)="startEdit(plan)">Edit</button>
            <button class="btn-sm btn-danger" (click)="deactivate(plan)">Deactivate</button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .sa-page { padding: 24px; }
    .sa-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; }
    .plan-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px,1fr)); gap: 20px; }
    .plan-card { background: #fff; border: 1px solid #e5e7eb; border-radius: 10px; padding: 20px; }
    .plan-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; }
    .plan-name { font-weight: 700; font-size: 16px; }
    .plan-price { font-size: 20px; font-weight: 600; color: #2563eb; margin-bottom: 12px; }
    .plan-price span { font-size: 13px; color: #64748b; font-weight: 400; }
    .plan-limits { display: flex; gap: 10px; font-size: 13px; color: #475569; margin-bottom: 10px; }
    .plan-features { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 14px; }
    .feature { font-size: 12px; background: #eff6ff; color: #2563eb; padding: 2px 7px; border-radius: 10px; }
    .plan-actions { display: flex; gap: 8px; }
    .badge { padding: 2px 8px; border-radius: 12px; font-size: 12px; font-weight: 600; }
    .badge-active { background: #dcfce7; color: #16a34a; }
    .badge-inactive { background: #f1f5f9; color: #64748b; }
    .btn-sm { padding: 5px 12px; font-size: 12px; border: 1px solid #d1d5db; border-radius: 4px; cursor: pointer; }
    .btn-danger { background: #fee2e2; border-color: #dc2626; color: #dc2626; }
    .btn-primary { padding: 8px 16px; background: #1e293b; color: #fff; border: none; border-radius: 6px; cursor: pointer; }
    .btn-secondary { padding: 8px 16px; background: #f1f5f9; color: #334155; border: 1px solid #cbd5e1; border-radius: 6px; cursor: pointer; }
    .sa-modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,.5); display: flex; align-items: center; justify-content: center; z-index: 1000; overflow-y: auto; }
    .sa-modal { background: #fff; border-radius: 10px; padding: 28px; width: 420px; max-height: 90vh; overflow-y: auto; display: flex; flex-direction: column; gap: 10px; }
    .sa-modal h3 { margin: 0 0 8px; }
    .sa-modal label { display: flex; flex-direction: column; gap: 3px; font-size: 13px; }
    .sa-modal input[type=text], .sa-modal input[type=number] { padding: 7px; border: 1px solid #d1d5db; border-radius: 4px; }
    .checkboxes { display: flex; flex-wrap: wrap; gap: 10px; }
    .checkboxes label { flex-direction: row; align-items: center; gap: 5px; }
    .sa-modal-actions { display: flex; gap: 8px; margin-top: 8px; }
  `]
})
export class PlanListComponent implements OnInit {
  plans: any[] = [];
  showForm = false;
  editPlan: any = null;
  formData: any = {};
  form: any;

  constructor(private api: SuperAdminApiService) {}

  ngOnInit(): void { this.load(); }

  load(): void {
    this.api.getPlans().subscribe(p => this.plans = p);
  }

  resetForm(): void {
    this.formData = {
      name: '', description: '', priceMonthly: 0, priceYearly: 0,
      maxUsers: 5, maxBooks: 500, maxStorageGb: 1,
      canUseAnalytics: false, canUseApi: false, canUseSso: false, canUseCustomBranding: false,
      stripePriceIdMonthly: '', stripePriceIdYearly: ''
    };
  }

  startEdit(plan: any): void {
    this.editPlan = plan;
    this.formData = { ...plan };
    this.showForm = true;
  }

  save(): void {
    const req = this.editPlan
      ? this.api.updatePlan(this.editPlan.id, this.formData)
      : this.api.createPlan(this.formData);
    req.subscribe(() => { this.showForm = false; this.load(); });
  }

  deactivate(plan: any): void {
    if (confirm(`Deactivate plan "${plan.name}"?`)) {
      this.api.deletePlan(plan.id).subscribe(() => this.load());
    }
  }
}
