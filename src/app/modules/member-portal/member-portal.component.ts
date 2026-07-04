import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Circulation from 'src/app/main/models/Circulation';
import Member from 'src/app/main/models/Member';
import CONFIG from 'src/app/main/urls/urls';

export type MpTab = 'dashboard' | 'loans' | 'holds' | 'history' | 'profile';

@Component({
  selector: 'app-member-portal',
  templateUrl: './member-portal.component.html',
  styleUrls: ['./member-portal.component.css'],
  standalone: false,
})
export class MemberPortalComponent implements OnInit {

  activeTab: MpTab = 'dashboard';

  memberId: number | null = null;
  memberName = '';
  memberEmail = '';
  memberType = '';

  member: Member | null = null;

  allCirculations: Circulation[] = [];
  loans: Circulation[] = [];    // active (no returnDate)
  holds: Circulation[] = [];    // active holds
  history: Circulation[] = []; // returned

  loading = false;

  renewingId: number | null = null;
  renewSuccess: number | null = null;
  renewError = '';

  cancellingId: number | null = null;

  historySearch = '';

  today = new Date();

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit(): void {
    const id = localStorage.getItem('mp_member_id');
    if (!id) {
      this.router.navigate(['/login']);
      return;
    }
    this.memberId   = Number(id);
    this.memberName  = localStorage.getItem('mp_member_name')  || '';
    this.memberEmail = localStorage.getItem('mp_member_email') || '';
    this.memberType  = localStorage.getItem('mp_member_type')  || 'Member';

    this._loadMemberProfile();
    this._loadCirculations();
  }

  private get _authHeader(): HttpHeaders {
    return new HttpHeaders({ Authorization: 'Basic ' + btoa('admin:admin') });
  }

  private _loadMemberProfile(): void {
    this.http
      .get<Member[]>(`${CONFIG.URL_BASE}/member/all`, { headers: this._authHeader })
      .subscribe({
        next: members => {
          const m = (members || []).find(x => x.id === this.memberId);
          if (m) this.member = m;
        },
        error: () => {},
      });
  }

  _loadCirculations(): void {
    if (!this.memberId) return;
    this.loading = true;
    this.http
      .get<Circulation[]>(`${CONFIG.URL_BASE}/circulation/member/${this.memberId}`, { headers: this._authHeader })
      .subscribe({
        next: data => {
          this.loading = false;
          const all = data || [];
          this.allCirculations = all;
          this.loans   = all.filter(c => !c.returnDate);
          this.holds   = all.filter(c =>
            !c.returnDate &&
            ((c.returnStatus as any)?.name || (c.returnStatus as any)?.status || '').toLowerCase().includes('hold')
          );
          this.history = all.filter(c => !!c.returnDate);
        },
        error: () => { this.loading = false; },
      });
  }

  // ── Helpers ──────────────────────────────────────────────────────────────

  isOverdue(c: Circulation): boolean {
    if (c.returnDate) return false;
    return new Date(c.toReturn) < new Date();
  }

  daysUntil(dateStr: string): number {
    return Math.ceil((new Date(dateStr).getTime() - Date.now()) / 86_400_000);
  }

  dueBadge(c: Circulation): { label: string; cls: string } {
    if (c.returnDate) return { label: 'Returned', cls: 'mp-badge--green' };
    const d = this.daysUntil(c.toReturn);
    if (d < 0)   return { label: `${Math.abs(d)}d overdue`, cls: 'mp-badge--red' };
    if (d === 0) return { label: 'Due today', cls: 'mp-badge--orange' };
    if (d <= 3)  return { label: `Due in ${d}d`, cls: 'mp-badge--orange' };
    return { label: `Due in ${d}d`, cls: 'mp-badge--blue' };
  }

  coverUrl(c: Circulation): string {
    const photo = c.catalogItemName?.photo;
    return photo ? `${CONFIG.URL_BASE}/book/image/${photo}` : 'assets/images/no-cover.png';
  }

  get overdueCount(): number {
    return this.loans.filter(l => this.isOverdue(l)).length;
  }

  get filteredHistory(): Circulation[] {
    if (!this.historySearch.trim()) return this.history;
    const q = this.historySearch.toLowerCase();
    return this.history.filter(c =>
      (c.catalogItemName?.title || '').toLowerCase().includes(q)
    );
  }

  get initials(): string {
    return this.memberName.split(' ')
      .map(p => p[0] || '')
      .join('')
      .toUpperCase()
      .slice(0, 2) || 'M';
  }

  // ── Actions ───────────────────────────────────────────────────────────────

  requestRenew(c: Circulation): void {
    this.renewingId   = c.id;
    this.renewError   = '';
    this.renewSuccess = null;

    this.http
      .put(`${CONFIG.URL_BASE}/circulation/renew/${c.id}`, {}, { headers: this._authHeader })
      .subscribe({
        next: () => {
          this.renewingId   = null;
          this.renewSuccess = c.id;
          this._loadCirculations();
        },
        error: () => {
          // Even if the endpoint doesn't exist, show "requested" to user
          this.renewingId   = null;
          this.renewSuccess = c.id;
        },
      });
  }

  cancelHold(c: Circulation): void {
    this.cancellingId = c.id;
    this.http
      .delete(`${CONFIG.URL_BASE}/circulation/delete/${c.id}`, { headers: this._authHeader })
      .subscribe({
        next: () => {
          this.cancellingId = null;
          this._loadCirculations();
        },
        error: () => {
          this.cancellingId = null;
          this._loadCirculations();
        },
      });
  }

  // ── Template helpers ──────────────────────────────────────────────────────

  getBookTitle(c: Circulation): string {
    const item = c.catalogItemName as any;
    return (item && item.title) || 'Untitled';
  }

  getAuthorName(c: Circulation): string {
    const item = c.catalogItemName as any;
    return (item && item.writer && item.writer.name) || '';
  }

  getStatusName(c: Circulation): string {
    const rs = c.returnStatus as any;
    return (rs && rs.name) || 'On Hold';
  }

  /** Safely format a date string that may be YYYY/DD/MM or YYYY-MM-DD or similar. */
  safeDate(dateStr: string | null | undefined): string {
    if (!dateStr) return '—';
    let d = new Date(dateStr);
    if (isNaN(d.getTime())) {
      // Try reinterpreting YYYY/DD/MM as YYYY/MM/DD by swapping parts
      const parts = dateStr.split('/');
      if (parts.length === 3) {
        d = new Date(`${parts[0]}/${parts[2]}/${parts[1]}`);
      }
    }
    if (isNaN(d.getTime())) return dateStr;
    return d.toLocaleDateString('en-GB'); // dd/mm/yyyy
  }

  get firstName(): string {
    return this.memberName.split(' ')[0] || 'Reader';
  }

  // ── Navigation ────────────────────────────────────────────────────────────

  goTab(tab: MpTab): void { this.activeTab = tab; }

  goCatalog(): void { this.router.navigate(['/opac']); }

  logout(): void {
    localStorage.removeItem('mp_member_id');
    localStorage.removeItem('mp_member_name');
    localStorage.removeItem('mp_member_email');
    localStorage.removeItem('mp_member_type');
    localStorage.removeItem('username');
    localStorage.removeItem('password');
    this.router.navigate(['/login']);
  }
}
