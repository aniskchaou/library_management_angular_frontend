import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import CONFIG from 'src/app/main/urls/urls';

interface Webhook {
  id?: number;
  url: string;
  events: string;
  secret: string;
  active: boolean;
  description: string;
}

@Component({
  selector: 'app-webhooks',
  templateUrl: './webhooks.component.html',
  styleUrls: ['./webhooks.component.css'],
  standalone: false,
})
export class WebhooksComponent implements OnInit {

  webhooks: Webhook[] = [];
  loading = false;

  supportedEvents: string[] = [];
  form: Webhook = this.blank();
  editing = false;
  saving  = false;
  testResult: string | null = null;
  formError = '';

  private get headers(): HttpHeaders {
    return new HttpHeaders({ Authorization: 'Basic ' + btoa('admin:admin') });
  }

  constructor(private http: HttpClient, private modal: NgbModal) {}

  ngOnInit(): void {
    this.load();
    this.http.get<string[]>(`${CONFIG.URL_BASE}/webhook/events`, { headers: this.headers })
      .subscribe({ next: e => this.supportedEvents = e, error: () => {} });
  }

  load(): void {
    this.loading = true;
    this.http.get<Webhook[]>(`${CONFIG.URL_BASE}/webhook/all`, { headers: this.headers })
      .subscribe({
        next: d => { this.webhooks = d || []; this.loading = false; },
        error: () => { this.loading = false; }
      });
  }

  openForm(modal: any, wh?: Webhook): void {
    this.form = wh ? { ...wh } : this.blank();
    this.editing = !!wh;
    this.formError = '';
    this.modal.open(modal, { size: 'lg' });
  }

  save(ref: any): void {
    if (!this.form.url) { this.formError = 'URL is required'; return; }
    this.saving = true;
    const req = this.editing
      ? this.http.put(`${CONFIG.URL_BASE}/webhook/${this.form.id}`, this.form, { headers: this.headers })
      : this.http.post(`${CONFIG.URL_BASE}/webhook/create`, this.form, { headers: this.headers });
    req.subscribe({
      next: () => { this.saving = false; ref.close(); this.load(); },
      error: () => { this.saving = false; this.formError = 'Save failed.'; }
    });
  }

  delete(id: number): void {
    if (!confirm('Delete this webhook?')) return;
    this.http.delete(`${CONFIG.URL_BASE}/webhook/${id}`, { headers: this.headers })
      .subscribe({ next: () => this.load(), error: () => {} });
  }

  testWebhook(id: number): void {
    this.testResult = 'Sending test ping…';
    this.http.post(`${CONFIG.URL_BASE}/webhook/${id}/test`, {}, { headers: this.headers })
      .subscribe({
        next: () => { this.testResult = '✓ Test ping sent successfully!'; },
        error: () => { this.testResult = '✗ Test failed — check console.'; }
      });
  }

  toggleActive(wh: Webhook): void {
    wh.active = !wh.active;
    this.http.put(`${CONFIG.URL_BASE}/webhook/${wh.id}`, wh, { headers: this.headers })
      .subscribe({ error: () => { wh.active = !wh.active; } });
  }

  eventList(eventsStr: string): string[] {
    return (eventsStr || '').split(',').map(s => s.trim()).filter(Boolean);
  }

  private blank(): Webhook {
    return { url: '', events: '', secret: '', active: true, description: '' };
  }
}
