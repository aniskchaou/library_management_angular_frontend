import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Invoice } from 'src/app/main/models/Invoice';

// ─── Payment model (persisted to localStorage) ────────────────────────────────
export interface Payment {
  id: string;                          // generated locally
  invoiceId: number;
  paymentDate: string;                 // YYYY-MM-DD
  amount: number;
  method: 'bank_transfer' | 'paypal';

  // Bank Transfer fields
  bankName?: string;
  accountHolder?: string;
  accountNumber?: string;
  swiftBic?: string;
  iban?: string;
  transferReference?: string;

  // PayPal (manual record) fields
  paypalEmail?: string;
  paypalTransactionId?: string;

  // Common
  notes?: string;
  status: 'pending' | 'confirmed' | 'rejected';
  recordedBy: string;
  recordedAt: string;                  // ISO datetime
}

const STORAGE_KEY = 'acquisition_payments';

@Component({
  selector: 'app-payment-modal',
  templateUrl: './payment-modal.component.html',
  styleUrls: ['./payment-modal.component.css'],
  standalone: false,
})
export class PaymentModalComponent implements OnInit {

  @Input() invoice!: Invoice;

  // ─── Form model ────────────────────────────────────────────────────────────
  method: 'bank_transfer' | 'paypal' = 'bank_transfer';
  amount: number | null = null;
  paymentDate: string = new Date().toISOString().substring(0, 10);
  bankName     = '';
  accountHolder = '';
  accountNumber = '';
  swiftBic     = '';
  iban         = '';
  transferReference = '';
  paypalEmail  = '';
  paypalTransactionId = '';
  notes        = '';
  status: 'pending' | 'confirmed' = 'pending';

  // ─── History ──────────────────────────────────────────────────────────────
  history: Payment[] = [];
  totalPaid = 0;
  remaining = 0;

  // ─── Validation ───────────────────────────────────────────────────────────
  validationError = '';

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit(): void {
    // Prefill amount with remaining balance
    this.history = this._loadHistory();
    this.totalPaid = this.history.reduce((s, p) =>
      s + (p.status !== 'rejected' ? p.amount : 0), 0);
    this.remaining = Math.max(0, (this.invoice.totalAmount || 0) - this.totalPaid);
    this.amount = this.remaining > 0 ? this.remaining : null;

    // Pre-fill bank info from vendor if available
    if (this.invoice.vendor) {
      this.accountHolder = this.invoice.vendor.name || '';
      this.accountNumber = this.invoice.vendor.accountNumber || '';
    }
  }

  // ─── Helpers ──────────────────────────────────────────────────────────────

  private _loadHistory(): Payment[] {
    try {
      const all: Record<string, Payment[]> = JSON.parse(
        localStorage.getItem(STORAGE_KEY) || '{}');
      return all[String(this.invoice.id)] || [];
    } catch { return []; }
  }

  private _saveHistory(payments: Payment[]): void {
    try {
      const all: Record<string, Payment[]> = JSON.parse(
        localStorage.getItem(STORAGE_KEY) || '{}');
      all[String(this.invoice.id)] = payments;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
    } catch { /* ignore */ }
  }

  // ─── Actions ───────────────────────────────────────────────────────────────

  save(): void {
    this.validationError = '';

    if (!this.amount || this.amount <= 0) {
      this.validationError = 'Amount must be greater than 0.'; return;
    }
    if (!this.paymentDate) {
      this.validationError = 'Payment date is required.'; return;
    }
    if (this.method === 'bank_transfer') {
      if (!this.bankName.trim()) {
        this.validationError = 'Bank name is required for bank transfer.'; return;
      }
      if (!this.transferReference.trim() && !this.iban.trim() && !this.accountNumber.trim()) {
        this.validationError = 'Provide at least one of: transfer reference, IBAN, or account number.'; return;
      }
    } else {
      if (!this.paypalEmail.trim()) {
        this.validationError = 'PayPal email is required.'; return;
      }
    }

    const payment: Payment = {
      id: `pay_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
      invoiceId: this.invoice.id!,
      paymentDate: this.paymentDate,
      amount: this.amount,
      method: this.method,
      bankName: this.bankName || undefined,
      accountHolder: this.accountHolder || undefined,
      accountNumber: this.accountNumber || undefined,
      swiftBic: this.swiftBic || undefined,
      iban: this.iban || undefined,
      transferReference: this.transferReference || undefined,
      paypalEmail: this.paypalEmail || undefined,
      paypalTransactionId: this.paypalTransactionId || undefined,
      notes: this.notes || undefined,
      status: this.status,
      recordedBy: localStorage.getItem('username') || 'admin',
      recordedAt: new Date().toISOString(),
    };

    const updated = [...this.history, payment];
    this._saveHistory(updated);
    this.activeModal.close(payment);
  }

  removePayment(id: string): void {
    const updated = this.history.filter(p => p.id !== id);
    this._saveHistory(updated);
    this.history = updated;
    this.totalPaid = updated.reduce((s, p) =>
      s + (p.status !== 'rejected' ? p.amount : 0), 0);
    this.remaining = Math.max(0, (this.invoice.totalAmount || 0) - this.totalPaid);
  }

  dismiss(): void {
    this.activeModal.dismiss();
  }

  methodLabel(m: string): string {
    return m === 'bank_transfer' ? 'Bank Transfer' : 'PayPal (Manual)';
  }

  statusClass(s: string): string {
    return s === 'confirmed' ? 'badge-success' : s === 'rejected' ? 'badge-danger' : 'badge-warning';
  }
}

// ─── Static helpers (used in invoice.component) ───────────────────────────────

export function loadAllPayments(): Record<string, Payment[]> {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}'); } catch { return {}; }
}

export function getInvoicePaymentStatus(
  invoiceId: number, totalAmount: number
): { label: string; cssClass: string; paidAmount: number } {
  const all = loadAllPayments();
  const payments: Payment[] = all[String(invoiceId)] || [];
  const paid = payments.reduce((s, p) => s + (p.status !== 'rejected' ? p.amount : 0), 0);
  if (paid <= 0) return { label: 'Unpaid',  cssClass: 'badge-danger',  paidAmount: 0 };
  if (paid < totalAmount) return { label: 'Partial', cssClass: 'badge-warning', paidAmount: paid };
  return { label: 'Paid', cssClass: 'badge-success', paidAmount: paid };
}
