import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import CONFIG from 'src/app/main/urls/urls';

@Component({
    selector: 'app-bulk-actions',
    templateUrl: './bulk-actions.component.html',
    styleUrls: ['./bulk-actions.component.css'],
    standalone: false
})
export class BulkActionsComponent implements OnInit {
  private base = CONFIG.URL_BASE;

  // Upload state
  bookFile: File | null = null;
  memberFile: File | null = null;
  bookResult: any = null;
  memberResult: any = null;
  bookLoading = false;
  memberLoading = false;

  constructor(private http: HttpClient) { }

  ngOnInit(): void { }

  // ── Book import ───────────────────────────────────────────────────────────
  onBookFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.bookFile = input.files ? input.files[0] : null;
    this.bookResult = null;
  }

  importBooks() {
    if (!this.bookFile) return;
    this.bookLoading = true;
    const form = new FormData();
    form.append('file', this.bookFile);
    this.http.post(`${this.base}/bulk/books/import/csv`, form).subscribe({
      next: r => { this.bookResult = r; this.bookLoading = false; },
      error: e => { this.bookResult = { error: e.message }; this.bookLoading = false; }
    });
  }

  // ── Member import ─────────────────────────────────────────────────────────
  onMemberFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.memberFile = input.files ? input.files[0] : null;
    this.memberResult = null;
  }

  importMembers() {
    if (!this.memberFile) return;
    this.memberLoading = true;
    const form = new FormData();
    form.append('file', this.memberFile);
    this.http.post(`${this.base}/bulk/members/import/csv`, form).subscribe({
      next: r => { this.memberResult = r; this.memberLoading = false; },
      error: e => { this.memberResult = { error: e.message }; this.memberLoading = false; }
    });
  }

  // ── Exports ───────────────────────────────────────────────────────────────
  exportBooks() {
    window.open(`${this.base}/book/export/csv`, '_blank');
  }

  exportMembers() {
    window.open(`${this.base}/member/export/csv`, '_blank');
  }

  exportCirculations() {
    window.open(`${this.base}/circulation/export/csv`, '_blank');
  }

  exportBooksExcel() {
    window.open(`${this.base}/excel/books/export`, '_blank');
  }

  exportMembersExcel() {
    window.open(`${this.base}/excel/members/export`, '_blank');
  }

  // ── Templates ─────────────────────────────────────────────────────────────
  downloadBookTemplate() {
    window.open(`${this.base}/bulk/books/template/csv`, '_blank');
  }

  downloadMemberTemplate() {
    window.open(`${this.base}/bulk/members/template/csv`, '_blank');
  }
}

