import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import CatalogItem from 'src/app/main/models/Book';
import CONFIG from 'src/app/main/urls/urls';
import { OpacAuthService } from '../opac-auth.service';

@Component({
  selector: 'app-opac-detail',
  templateUrl: './opac-detail.component.html',
  styleUrls: ['./opac-detail.component.css'],
  standalone: false,
})
export class OpacDetailComponent implements OnInit {

  @Input() item: CatalogItem;
  @Input() auth: OpacAuthService;

  activeTab: 'details' | 'marc' | 'dc' = 'details';

  // Hold request state
  holdSent    = false;
  holdSending = false;
  holdError   = '';

  constructor(
    public activeModal: NgbActiveModal,
    private http: HttpClient,
  ) {}

  ngOnInit(): void {}

  // ─── Helpers ──────────────────────────────────────────────────────────────

  coverUrl(): string {
    if (this.item?.photo) return `${CONFIG.URL_BASE}/book/image/${this.item.photo}`;
    return 'assets/images/no-cover.png';
  }

  hasDigital(): boolean {
    return !!(this.item?.pdf || this.item?.link || this.item?.marc_856);
  }

  digitalUrl(): string {
    return this.item?.marc_856 || this.item?.link || '';
  }

  pdfUrl(): string {
    return this.item?.pdf ? `${CONFIG.URL_BASE}/ebook/pdf/${this.item.pdf}` : '';
  }

  subjectChips(): string[] {
    if (!this.item?.marc_650) return [];
    return this.item.marc_650.split(',').map(s => s.trim()).filter(Boolean);
  }

  availabilityClass(): string {
    const n = Number(this.item?.number_of_books || 0);
    if (n <= 0) return 'opac-det-avail--none';
    if (n === 1) return 'opac-det-avail--low';
    return 'opac-det-avail--ok';
  }

  availabilityLabel(): string {
    const n = Number(this.item?.number_of_books || 0);
    if (n <= 0) return 'Not available — all copies checked out';
    if (n === 1) return '1 copy available';
    return `${n} copies available`;
  }

  // ─── Hold / request ────────────────────────────────────────────────────────

  requestHold(): void {
    if (!this.auth?.isLoggedIn || this.holdSent) return;
    this.holdSending = true;
    this.holdError   = '';
    const body = {
      memberId:      this.auth.member?.id,
      catalogItemId: this.item?.id,
    };
    this.http.post(`${CONFIG.URL_BASE}/circulation/hold`, body, {
      headers: this.auth.authHeader,
    }).subscribe({
      next:  () => { this.holdSent = true; this.holdSending = false; },
      error: (e) => {
        this.holdSending = false;
        this.holdError = e?.error?.message || 'Could not place hold. Please try at the circulation desk.';
      },
    });
  }
}
