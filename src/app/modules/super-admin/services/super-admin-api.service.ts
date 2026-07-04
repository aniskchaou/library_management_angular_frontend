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

  // ── SaaS Analytics ────────────────────────────────────────────
  getSaasDashboard(): Observable<any> {
    return this.http.get(`${this.base}/api/super-admin/saas-analytics/dashboard`);
  }

  getRevenueMetrics(): Observable<any> {
    return this.http.get(`${this.base}/api/super-admin/saas-analytics/revenue`);
  }

  // ── Subscriptions ─────────────────────────────────────────────
  getSubscriptionMetrics(): Observable<any> {
    return this.http.get(`${this.base}/api/subscriptions/metrics`);
  }

  createCheckoutSession(orgId: number, planId: number, cycle: string): Observable<any> {
    return this.http.post(`${this.base}/api/subscriptions/checkout`, { orgId, planId, cycle });
  }
}
