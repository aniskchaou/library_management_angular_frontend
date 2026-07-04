import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import CONFIG from '../../../main/urls/urls';

@Injectable({ providedIn: 'root' })
export class SuperAdminApiService {
  private base = CONFIG.URL_BASE;

  constructor(private http: HttpClient) {}

  // ── Organizations ──────────────────────────────────────────────
  getOrganizations(page = 0, size = 20): Observable<any> {
    return this.http.get(`${this.base}/api/super-admin/organizations`, {
      params: new HttpParams().set('page', page).set('size', size)
    });
  }

  getOrganization(id: number): Observable<any> {
    return this.http.get(`${this.base}/api/super-admin/organizations/${id}`);
  }

  createOrganization(org: any): Observable<any> {
    return this.http.post(`${this.base}/api/super-admin/organizations`, org);
  }

  updateOrganization(id: number, org: any): Observable<any> {
    return this.http.put(`${this.base}/api/super-admin/organizations/${id}`, org);
  }

  suspendOrganization(id: number, reason: string): Observable<any> {
    return this.http.post(`${this.base}/api/super-admin/organizations/${id}/suspend`, { reason });
  }

  activateOrganization(id: number): Observable<any> {
    return this.http.post(`${this.base}/api/super-admin/organizations/${id}/activate`, {});
  }

  deleteOrganization(id: number): Observable<any> {
    return this.http.delete(`${this.base}/api/super-admin/organizations/${id}`);
  }

  transferOwnership(id: number, newOwnerId: number): Observable<any> {
    return this.http.post(`${this.base}/api/super-admin/organizations/${id}/transfer-ownership`, { newOwnerId });
  }

  getOrgStats(): Observable<any> {
    return this.http.get(`${this.base}/api/super-admin/organizations/stats`);
  }

  // ── Plans ─────────────────────────────────────────────────────
  getPlans(): Observable<any[]> {
    return this.http.get<any[]>(`${this.base}/api/super-admin/plans`);
  }

  getPlan(id: number): Observable<any> {
    return this.http.get(`${this.base}/api/super-admin/plans/${id}`);
  }

  createPlan(plan: any): Observable<any> {
    return this.http.post(`${this.base}/api/super-admin/plans`, plan);
  }

  updatePlan(id: number, plan: any): Observable<any> {
    return this.http.put(`${this.base}/api/super-admin/plans/${id}`, plan);
  }

  deletePlan(id: number): Observable<any> {
    return this.http.delete(`${this.base}/api/super-admin/plans/${id}`);
  }

  // ── Users ─────────────────────────────────────────────────────
  getUsers(page = 0, size = 20): Observable<any> {
    return this.http.get(`${this.base}/api/super-admin/users`, {
      params: new HttpParams().set('page', page).set('size', size)
    });
  }

  lockUser(id: number, reason: string): Observable<any> {
    return this.http.post(`${this.base}/api/super-admin/users/${id}/lock`, { reason });
  }

  unlockUser(id: number): Observable<any> {
    return this.http.post(`${this.base}/api/super-admin/users/${id}/unlock`, {});
  }

  resetUserPassword(id: number): Observable<any> {
    return this.http.post(`${this.base}/api/super-admin/users/${id}/reset-password`, {});
  }

  impersonateUser(id: number): Observable<any> {
    return this.http.post(`${this.base}/api/super-admin/users/${id}/impersonate`, {});
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.base}/api/super-admin/users/${id}`);
  }

  // ── Audit Logs ────────────────────────────────────────────────
  getAuditLogs(page = 0, size = 50): Observable<any> {
    return this.http.get(`${this.base}/api/super-admin/audit-logs`, {
      params: new HttpParams().set('page', page).set('size', size)
    });
  }

  getAuditLogsByOrg(orgId: number, page = 0, size = 50): Observable<any> {
    return this.http.get(`${this.base}/api/super-admin/audit-logs/organization/${orgId}`, {
      params: new HttpParams().set('page', page).set('size', size)
    });
  }

  getLoginHistory(username?: string, page = 0, size = 50): Observable<any> {
    let params = new HttpParams().set('page', page).set('size', size);
    if (username) params = params.set('username', username);
    return this.http.get(`${this.base}/api/super-admin/audit-logs/login-history`, { params });
  }

  getSecurityEvents(page = 0, size = 50): Observable<any> {
    return this.http.get(`${this.base}/api/super-admin/audit-logs/security-events`, {
      params: new HttpParams().set('page', page).set('size', size)
    });
  }

  // ── SaaS Analytics ────────────────────────────────────────────
  getSaasDashboard(): Observable<any> {
    return this.http.get(`${this.base}/api/super-admin/saas-analytics/dashboard`);
  }

  getRevenueMetrics(): Observable<any> {
    return this.http.get(`${this.base}/api/super-admin/saas-analytics/revenue`);
  }

  getSubscriptionsByPlan(): Observable<any[]> {
    return this.http.get<any[]>(`${this.base}/api/super-admin/saas-analytics/by-plan`);
  }

  getUserAnalytics(): Observable<any> {
    return this.http.get(`${this.base}/api/super-admin/saas-analytics/user-analytics`);
  }

  getExpiringSubscriptions(days = 30): Observable<any[]> {
    return this.http.get<any[]>(`${this.base}/api/super-admin/saas-analytics/expiring-subscriptions`, {
      params: new HttpParams().set('days', days)
    });
  }

  // ── Subscriptions ─────────────────────────────────────────────
  getSubscriptionMetrics(): Observable<any> {
    return this.http.get(`${this.base}/api/subscriptions/metrics`);
  }

  createCheckoutSession(orgId: number, planId: number, cycle: string): Observable<any> {
    return this.http.post(`${this.base}/api/subscriptions/checkout`, { orgId, planId, cycle });
  }

  changePlan(orgId: number, planId: number, cycle: string): Observable<any> {
    return this.http.post(`${this.base}/api/subscriptions/change-plan`, { orgId, planId, cycle });
  }

  activateTrial(orgId: number, planId: number, days: number): Observable<any> {
    return this.http.post(`${this.base}/api/subscriptions/activate-trial`, { orgId, planId, days });
  }

  extendTrial(orgId: number, days: number): Observable<any> {
    return this.http.post(`${this.base}/api/subscriptions/extend-trial`, { orgId, days });
  }

  issueRefund(chargeId: string, amountCents?: number): Observable<any> {
    return this.http.post(`${this.base}/api/subscriptions/refund`, { chargeId, amount: amountCents });
  }

  // ── Branches ──────────────────────────────────────────────────
  getBranches(orgId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.base}/api/super-admin/organizations/${orgId}/branches`);
  }

  createBranch(orgId: number, branch: any): Observable<any> {
    return this.http.post(`${this.base}/api/super-admin/organizations/${orgId}/branches`, branch);
  }

  updateBranch(orgId: number, id: number, branch: any): Observable<any> {
    return this.http.put(`${this.base}/api/super-admin/organizations/${orgId}/branches/${id}`, branch);
  }

  deleteBranch(orgId: number, id: number): Observable<any> {
    return this.http.delete(`${this.base}/api/super-admin/organizations/${orgId}/branches/${id}`);
  }

  // ── Global Settings ───────────────────────────────────────────
  getGlobalSettings(): Observable<any> {
    return this.http.get(`${this.base}/api/super-admin/global-settings`);
  }

  updateGlobalSettings(settings: any): Observable<any> {
    return this.http.put(`${this.base}/api/super-admin/global-settings`, settings);
  }

  // ── Invoices ──────────────────────────────────────────────────
  getAllInvoices(page = 0, size = 20): Observable<any> {
    return this.http.get(`${this.base}/api/super-admin/invoices`, {
      params: new HttpParams().set('page', page).set('size', size)
    });
  }

  getInvoicesByOrg(orgId: number, page = 0): Observable<any> {
    return this.http.get(`${this.base}/api/super-admin/invoices/organization/${orgId}`, {
      params: new HttpParams().set('page', page).set('size', 20)
    });
  }

  // ── Coupons ───────────────────────────────────────────────────
  getAllCoupons(): Observable<any[]> {
    return this.http.get<any[]>(`${this.base}/api/super-admin/coupons`);
  }

  createCoupon(coupon: any): Observable<any> {
    return this.http.post(`${this.base}/api/super-admin/coupons`, coupon);
  }

  updateCoupon(id: number, updates: any): Observable<any> {
    return this.http.put(`${this.base}/api/super-admin/coupons/${id}`, updates);
  }

  deleteCoupon(id: number): Observable<any> {
    return this.http.delete(`${this.base}/api/super-admin/coupons/${id}`);
  }

  // ── Monitoring ────────────────────────────────────────────────
  getSystemHealth(): Observable<any> {
    return this.http.get(`${this.base}/api/super-admin/monitoring/health`);
  }

  getApiRequests(page = 0, size = 50): Observable<any> {
    return this.http.get(`${this.base}/api/super-admin/monitoring/api-requests`, {
      params: new HttpParams().set('page', page).set('size', size)
    });
  }

  getTopEndpoints(): Observable<any[]> {
    return this.http.get<any[]>(`${this.base}/api/super-admin/monitoring/top-endpoints`);
  }
}
