import { Component, OnInit, Input } from '@angular/core';
import { SuperAdminApiService } from '../services/super-admin-api.service';

@Component({
  standalone: false,
  selector: 'app-branch-management',
  template: `
    <div class="branch-management">
      <div class="d-flex justify-content-between align-items-center mb-3">
        <h5 class="mb-0">Branches</h5>
        <button class="btn btn-sm btn-primary" (click)="showForm = true" *ngIf="!showForm">
          <i class="material-icons" style="font-size:16px;vertical-align:middle">add</i> New Branch
        </button>
      </div>

      <!-- Create form -->
      <div class="card mb-3" *ngIf="showForm">
        <div class="card-body">
          <h6>{{ editId ? 'Edit Branch' : 'New Branch' }}</h6>
          <div class="row g-2">
            <div class="col-md-6">
              <input class="form-control form-control-sm" placeholder="Branch Name *" [(ngModel)]="form.name">
            </div>
            <div class="col-md-6">
              <input class="form-control form-control-sm" placeholder="Address" [(ngModel)]="form.address">
            </div>
            <div class="col-md-6">
              <input class="form-control form-control-sm" placeholder="Contact Email" [(ngModel)]="form.contactEmail">
            </div>
            <div class="col-md-6">
              <input class="form-control form-control-sm" placeholder="Contact Phone" [(ngModel)]="form.contactPhone">
            </div>
            <div class="col-12">
              <label class="form-check-label">
                <input type="checkbox" class="form-check-input me-1" [(ngModel)]="form.isMain"> Main Branch
              </label>
            </div>
          </div>
          <div class="mt-2 d-flex gap-2">
            <button class="btn btn-sm btn-success" (click)="save()">Save</button>
            <button class="btn btn-sm btn-secondary" (click)="cancelForm()">Cancel</button>
          </div>
        </div>
      </div>

      <!-- Branch list -->
      <div class="table-responsive">
        <table class="table table-sm table-hover">
          <thead class="table-light">
            <tr>
              <th>Name</th>
              <th>Address</th>
              <th>Contact</th>
              <th>Main</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let b of branches">
              <td><strong>{{ b.name }}</strong></td>
              <td>{{ b.address || 'â€”' }}</td>
              <td>{{ b.contactEmail || b.contactPhone || 'â€”' }}</td>
              <td><span *ngIf="b.isMain" class="badge bg-info">Main</span></td>
              <td>
                <span class="badge" [ngClass]="b.isActive ? 'bg-success' : 'bg-secondary'">
                  {{ b.isActive ? 'Active' : 'Inactive' }}
                </span>
              </td>
              <td>
                <button class="btn btn-xs btn-outline-primary me-1" (click)="edit(b)">Edit</button>
                <button class="btn btn-xs btn-outline-danger" (click)="deactivate(b.id)" *ngIf="b.isActive">Deactivate</button>
              </td>
            </tr>
            <tr *ngIf="branches.length === 0">
              <td colspan="6" class="text-center text-muted py-3">No branches found</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `
})
export class BranchManagementComponent implements OnInit {
  @Input() orgId!: number;

  branches: any[] = [];
  showForm = false;
  editId: number | null = null;
  form = { name: '', address: '', contactEmail: '', contactPhone: '', isMain: false };

  constructor(private api: SuperAdminApiService) {}

  ngOnInit() { this.load(); }

  load() {
    if (!this.orgId) return;
    this.api.getBranches(this.orgId).subscribe((b: any[]) => this.branches = b);
  }

  save() {
    if (!this.form.name) return;
    const obs = this.editId
      ? this.api.updateBranch(this.orgId, this.editId, this.form)
      : this.api.createBranch(this.orgId, this.form);
    obs.subscribe(() => { this.cancelForm(); this.load(); });
  }

  edit(b: any) {
    this.editId = b.id;
    this.form = { name: b.name, address: b.address, contactEmail: b.contactEmail, contactPhone: b.contactPhone, isMain: b.isMain };
    this.showForm = true;
  }

  deactivate(id: number) {
    this.api.deleteBranch(this.orgId, id).subscribe(() => this.load());
  }

  cancelForm() {
    this.showForm = false;
    this.editId = null;
    this.form = { name: '', address: '', contactEmail: '', contactPhone: '', isMain: false };
  }
}

