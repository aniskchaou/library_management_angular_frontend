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

  activeTab: 'details' | 'marc' | 'dc' | 'reviews' = 'details';

  // Hold request state
  holdSent    = false;
  holdSending = false;
  holdError   = '';

  // Reviews / Ratings
  reviews: any[]     = [];
  reviewsLoaded      = false;
  averageRating      = 0;
  myRating           = 0;
  myReviewText       = '';
  reviewSubmitting   = false;
  reviewSubmitted    = false;
  reviewError        = '';
  wishlistAdded      = false;

  constructor(
    public activeModal: NgbActiveModal,
    private http: HttpClient,
  ) {}

  ngOnInit(): void {
    this._loadReviews();
  }

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

  // ─── Reviews / Ratings ────────────────────────────────────────────────────

  private _loadReviews(): void {
    if (!this.item?.id) return;
    this.http.get<any[]>(`${CONFIG.URL_BASE}/review/book/${this.item.id}`).subscribe({
      next: r => {
        this.reviews = r || [];
        this.reviewsLoaded = true;
        const total = this.reviews.reduce((s, rv) => s + (rv.rating || 0), 0);
        this.averageRating = this.reviews.length ? Math.round((total / this.reviews.length) * 10) / 10 : 0;

        // Pre-fill my review if already submitted
        if (this.auth?.isLoggedIn && this.auth.member?.id) {
          const mine = this.reviews.find(rv =>
            (rv.member?.id ?? rv.memberId) === this.auth.member?.id
          );
          if (mine) {
            this.myRating = mine.rating;
            this.myReviewText = mine.reviewText ?? '';
            this.reviewSubmitted = true;
          }
        }
      },
      error: () => { this.reviewsLoaded = true; }
    });
  }

  setMyRating(star: number): void {
    if (this.auth?.isLoggedIn) this.myRating = star;
  }

  submitReview(): void {
    if (!this.auth?.isLoggedIn || !this.myRating) return;
    this.reviewSubmitting = true;
    this.reviewError = '';

    const body = {
      memberId:   this.auth.member?.id,
      bookId:     this.item?.id,
      rating:     this.myRating,
      reviewText: this.myReviewText,
    };
    this.http.post(`${CONFIG.URL_BASE}/review/add`, body, {
      headers: this.auth.authHeader,
    }).subscribe({
      next: () => {
        this.reviewSubmitted  = true;
        this.reviewSubmitting = false;
        this._loadReviews();
      },
      error: (e) => {
        this.reviewSubmitting = false;
        this.reviewError = e?.error?.message || 'Could not submit review.';
      }
    });
  }

  starsArray(n: number): number[] {
    return Array.from({ length: Math.round(n) }, (_, i) => i + 1);
  }

  reportReview(id: number): void {
    this.http.post(`${CONFIG.URL_BASE}/review/${id}/report`, {}, {
      headers: this.auth?.authHeader
    }).subscribe({ next: () => this._loadReviews(), error: () => {} });
  }

  // ─── Wishlist ─────────────────────────────────────────────────────────────

  addToWishlist(): void {
    if (!this.auth?.isLoggedIn) return;
    this.http.post(`${CONFIG.URL_BASE}/wishlist/add`, {
      memberId: this.auth.member?.id,
      bookId:   this.item?.id,
    }, { headers: this.auth.authHeader }).subscribe({
      next: () => { this.wishlistAdded = true; },
      error: () => {}
    });
  }
}
