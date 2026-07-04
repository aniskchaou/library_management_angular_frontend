import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import CONFIG from 'src/app/main/urls/urls';

interface BankTransferPayment {
  id?: number;
  memberId: number | null;
  memberName?: string;
  amount: number | null;
  currency: string;
  reference: string;
  bankDetails: string;
  purpose: string;
  note: string;
  status?: string;
  reviewedBy?: string;
  reviewNote?: string;
  transferDate?: string;
  submittedAt?: string;
  reviewedAt?: string;
}

interface AccountInfo {
  bankName: string;
  accountNumber: string;
  accountHolder: string;
  routingNumber: string;
  swiftCode: string;
  note: string;
}

@Component({
  selector: 'app-bank-transfer',
  templateUrl: './bank-transfer.component.html',
  styleUrls: ['./bank-transfer.component.css'],
  standalone: false,
})
export class BankTransferComponent implements OnInit {
  private base = CONFIG.URL_BASE;
  private adminHeaders = new HttpHeaders({ Authorization: 'Basic ' + btoa('admin:admin') });

  // Views: 'member' | 'admin'
  view: 'member' | 'admin' = 'admin';

  // Member form
  form: BankTransferPayment = this.emptyForm();
  submitting = false;
  submitResult: any = null;

  // Admin lists
  allPayments: BankTransferPayment[] = [];
  statusFilter = '';
  loading = false;

  // Account info
  accountInfo: AccountInfo = {
    bankName: '', accountNumber: '', accountHolder: '',
    routingNumber: '', swiftCode: '', note: ''
  };

  // Review modal
  reviewTarget: BankTransferPayment | null = null;
  reviewAction: 'confirm' | 'reject' = 'confirm';
  reviewNote = '';
  reviewedBy = '';

  purposes = ['FINE', 'SUBSCRIPTION', 'PURCHASE', 'OTHER'];
  currencies = ['USD', 'EUR', 'VND', 'GBP', 'AUD'];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadAccountInfo();
    this.loadAll();
    const stored = localStorage.getItem('mp_member_id');
    if (stored) { this.form.memberId = Number(stored); this.view = 'member'; }
  }

  private emptyForm(): BankTransferPayment {
    return { memberId: null, amount: null, currency: 'USD', reference: '', bankDetails: '', purpose: 'FINE', note: '' };
  }

  loadAccountInfo(): void {
    this.http.get<AccountInfo>(`${this.base}/bank-transfer/account-info`, { headers: this.adminHeaders })
      .subscribe({ next: d => this.accountInfo = d, error: () => {} });
  }

  loadAll(): void {
    this.loading = true;
    const url = this.statusFilter
      ? `${this.base}/bank-transfer/all?status=${this.statusFilter}`
      : `${this.base}/bank-transfer/all`;
    this.http.get<BankTransferPayment[]>(url, { headers: this.adminHeaders })
      .subscribe({ next: d => { this.allPayments = d; this.loading = false; }, error: () => { this.loading = false; } });
  }

  submitPayment(): void {
    if (!this.form.memberId || !this.form.amount) return;
    this.submitting = true;
    this.submitResult = null;
    this.http.post(`${this.base}/bank-transfer/submit`, this.form, { headers: this.adminHeaders })
      .subscribe({
        next: r => { this.submitResult = { success: true, data: r }; this.form = this.emptyForm(); this.submitting = false; },
        error: e => { this.submitResult = { success: false, msg: e.message }; this.submitting = false; }
      });
  }

  openReview(p: BankTransferPayment, action: 'confirm' | 'reject'): void {
    this.reviewTarget = p;
    this.reviewAction = action;
    this.reviewNote = '';
    this.reviewedBy = '';
  }

  submitReview(): void {
    if (!this.reviewTarget?.id) return;
    const body = { reviewedBy: this.reviewedBy, reviewNote: this.reviewNote };
    const url = `${this.base}/bank-transfer/${this.reviewTarget.id}/${this.reviewAction}`;
    this.http.post(url, body, { headers: this.adminHeaders }).subscribe({
      next: () => { this.reviewTarget = null; this.loadAll(); },
      error: () => { this.reviewTarget = null; this.loadAll(); }
    });
  }

  delete(id: number): void {
    if (!confirm('Delete this payment record?')) return;
    this.http.delete(`${this.base}/bank-transfer/${id}`, { headers: this.adminHeaders })
      .subscribe({ next: () => this.loadAll(), error: () => this.loadAll() });
  }

  statusColor(s: string): string {
    return s === 'CONFIRMED' ? '#22c55e' : s === 'REJECTED' ? '#ef4444' : '#f59e0b';
  }

  get filtered(): BankTransferPayment[] {
    if (!this.statusFilter) return this.allPayments;
    return this.allPayments.filter(p => p.status === this.statusFilter);
  }
}
