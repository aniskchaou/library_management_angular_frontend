import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { OpacAuthService } from '../opac-auth.service';
import Circulation from 'src/app/main/models/Circulation';
import Member from 'src/app/main/models/Member';
import CONFIG from 'src/app/main/urls/urls';

type AccountTab = 'loans' | 'history' | 'holds' | 'profile';

@Component({
  selector: 'app-opac-account',
  templateUrl: './opac-account.component.html',
  styleUrls: ['./opac-account.component.css'],
  standalone: false,
})
export class OpacAccountComponent implements OnInit, OnDestroy {

  // ─── Auth / login form ────────────────────────────────────────────────────
  loginEmail    = '';
  loginPassword = '';
  loginError    = '';
  loginBusy     = false;

  // ─── Data ─────────────────────────────────────────────────────────────────
  loans:   Circulation[] = [];   // currently borrowed (not returned)
  history: Circulation[] = [];   // all borrowing history
  holds:   Circulation[] = [];   // pending holds / requests
  member: Member | null  = null;

  loadingLoans   = false;

  // ─── UI ───────────────────────────────────────────────────────────────────
  activeTab: AccountTab = 'loans';

  private _sub: Subscription;

  constructor(
    public auth: OpacAuthService,
    private http: HttpClient,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this._sub = this.auth.member$.subscribe(m => {
      this.member = m;
      if (m) this._loadData();
    });
  }

  ngOnDestroy(): void { this._sub?.unsubscribe(); }

  // ─── Login ────────────────────────────────────────────────────────────────

  login(): void {
    if (!this.loginEmail || !this.loginPassword) return;
    this.loginBusy  = true;
    this.loginError = '';
    this.auth.login(this.loginEmail, this.loginPassword).subscribe({
      next:  () => { this.loginBusy = false; },
      error: (e) => {
        this.loginBusy  = false;
        this.loginError = e?.message === 'Member not found'
          ? 'Email address not registered as a library member.'
          : 'Login failed. Please check your credentials.';
      },
    });
  }

  logout(): void {
    this.auth.logout();
    this.loans   = [];
    this.history = [];
    this.holds   = [];
  }

  // ─── Data loading ─────────────────────────────────────────────────────────

  private _loadData(): void {
    if (!this.member?.id) return;
    this._loadLoans();
  }

  _loadLoans(): void {
    this.loadingLoans = true;
    this.http
      .get<Circulation[]>(
        `${CONFIG.URL_BASE}/circulation/member/${this.member.id}`,
        { headers: this.auth.authHeader }
      )
      .subscribe({
        next: rows => {
          this.loadingLoans = false;
          const all = rows || [];
          // Active: no returnDate
          this.loans = all.filter(r => !r.returnDate);
          // Holds: status has "hold" in it (case-insensitive)
          this.holds = all.filter(
            r => !r.returnDate && r.returnStatus?.name?.toLowerCase().includes('hold')
          );
          // History: all
          this.history = all;
        },
        error: () => { this.loadingLoans = false; },
      });
  }

  // ─── Helpers ──────────────────────────────────────────────────────────────

  isOverdue(circ: Circulation): boolean {
    if (circ.returnDate) return false;
    const due = new Date(circ.toReturn);
    return due < new Date();
  }

  daysUntil(dateStr: string): number {
    const diff = new Date(dateStr).getTime() - Date.now();
    return Math.ceil(diff / 86_400_000);
  }

  dueBadgeClass(circ: Circulation): string {
    if (circ.returnDate) return 'opac-acc-badge--returned';
    const days = this.daysUntil(circ.toReturn);
    if (days < 0)  return 'opac-acc-badge--overdue';
    if (days <= 3) return 'opac-acc-badge--soon';
    return 'opac-acc-badge--ok';
  }

  dueBadgeLabel(circ: Circulation): string {
    if (circ.returnDate) return 'Returned';
    const days = this.daysUntil(circ.toReturn);
    if (days < 0)  return `${Math.abs(days)}d overdue`;
    if (days === 0) return 'Due today';
    return `Due in ${days}d`;
  }

  coverUrl(circ: Circulation): string {
    const photo = circ.catalogItemName?.photo;
    if (photo) return `${CONFIG.URL_BASE}/book/image/${photo}`;
    return 'assets/images/no-cover.png';
  }

  get overdueLoans(): number {
    return this.loans.filter(l => this.isOverdue(l)).length;
  }

  goSearch(): void { this.router.navigate(['/opac']); }
}
