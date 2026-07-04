import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { SuperAdminGuard } from './guards/super-admin.guard';
import { SuperAdminDashboardComponent } from './dashboard/super-admin-dashboard.component';
import { TenantListComponent } from './tenants/tenant-list/tenant-list.component';
import { TenantDetailComponent } from './tenants/tenant-detail/tenant-detail.component';
import { PlanListComponent } from './plans/plan-list/plan-list.component';
import { PlanFormComponent } from './plans/plan-form/plan-form.component';
import { UserManagementComponent } from './users/user-management/user-management.component';
import { AuditLogViewComponent } from './audit-logs/audit-log-view.component';
import { SaasAnalyticsComponent } from './analytics/saas-analytics.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [SuperAdminGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: SuperAdminDashboardComponent },
      { path: 'tenants', component: TenantListComponent },
      { path: 'tenants/:id', component: TenantDetailComponent },
      { path: 'plans', component: PlanListComponent },
      { path: 'plans/new', component: PlanFormComponent },
      { path: 'plans/:id/edit', component: PlanFormComponent },
      { path: 'users', component: UserManagementComponent },
      { path: 'audit-logs', component: AuditLogViewComponent },
      { path: 'analytics', component: SaasAnalyticsComponent },
    ],
  },
];

@NgModule({
  declarations: [
    SuperAdminDashboardComponent,
    TenantListComponent,
    TenantDetailComponent,
    PlanListComponent,
    PlanFormComponent,
    UserManagementComponent,
    AuditLogViewComponent,
    SaasAnalyticsComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forChild(routes),
  ],
})
export class SuperAdminModule {}
