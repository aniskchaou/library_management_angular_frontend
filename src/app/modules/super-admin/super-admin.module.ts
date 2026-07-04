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
import { BranchManagementComponent } from './branches/branch-management.component';
import { GlobalSettingsComponent } from './settings/global-settings.component';
import { MonitoringComponent } from './monitoring/monitoring.component';
import { InvoicesComponent } from './billing/invoices.component';
import { CouponsComponent } from './billing/coupons.component';
import { GrowthReportComponent } from './reports/growth-report.component';
import { UserAnalyticsComponent } from './reports/user-analytics.component';

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
      { path: 'settings', component: GlobalSettingsComponent },
      { path: 'monitoring', component: MonitoringComponent },
      { path: 'invoices', component: InvoicesComponent },
      { path: 'coupons', component: CouponsComponent },
      { path: 'reports/growth', component: GrowthReportComponent },
      { path: 'reports/users', component: UserAnalyticsComponent },
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
    BranchManagementComponent,
    GlobalSettingsComponent,
    MonitoringComponent,
    InvoicesComponent,
    CouponsComponent,
    GrowthReportComponent,
    UserAnalyticsComponent,
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
