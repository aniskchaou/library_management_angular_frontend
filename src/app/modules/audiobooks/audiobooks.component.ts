import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import CONFIG from 'src/app/main/urls/urls';

interface AudioBook {
  id?: number;
  title: string;
  author: string;
  narrator: string;
  durationMinutes: number;
  fileUrl: string;
  coverUrl: string;
  isbn: string;
  language: string;
  genre: string;
  publisher: string;
  description: string;
  format: string;
  active: boolean;
}

@Component({
  selector: 'app-audiobooks',
  templateUrl: './audiobooks.component.html',
  styleUrls: ['./audiobooks.component.css'],
  standalone: false,
})
export class AudiobooksComponent implements OnInit {

  audiobooks: AudioBook[] = [];
  filtered:  AudioBook[] = [];
  loading = false;

  searchQuery = '';
  filterGenre = '';
  genres: string[] = [];

  // Form for add/edit
  form: AudioBook = this.blankForm();
  editing = false;
  saving  = false;
  formError = '';

  // Audio player
  playingUrl: string | null = null;

  private get headers(): HttpHeaders {
    return new HttpHeaders({ Authorization: 'Basic ' + btoa('admin:admin') });
  }

  constructor(
    private http: HttpClient,
    private modal: NgbModal,
  ) {}

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.loading = true;
    this.http.get<AudioBook[]>(`${CONFIG.URL_BASE}/audiobook/all`, { headers: this.headers })
      .subscribe({
        next: d => {
          this.audiobooks = d || [];
          this.genres = [...new Set(this.audiobooks.map(a => a.genre).filter(Boolean))];
          this.applyFilter();
          this.loading = false;
        },
        error: () => { this.loading = false; }
      });
  }

  applyFilter(): void {
    const q = this.searchQuery.toLowerCase();
    this.filtered = this.audiobooks.filter(a => {
      const matchQ = !q ||
        a.title?.toLowerCase().includes(q) ||
        a.author?.toLowerCase().includes(q) ||
        a.narrator?.toLowerCase().includes(q);
      const matchG = !this.filterGenre || a.genre === this.filterGenre;
      return matchQ && matchG;
    });
  }

  openForm(modal: any, book?: AudioBook): void {
    this.form = book ? { ...book } : this.blankForm();
    this.editing = !!book;
    this.formError = '';
    this.modal.open(modal, { size: 'lg' });
  }

  save(modalRef: any): void {
    if (!this.form.title) { this.formError = 'Title is required'; return; }
    this.saving = true;
    const req = this.editing
      ? this.http.put(`${CONFIG.URL_BASE}/audiobook/${this.form.id}`, this.form, { headers: this.headers })
      : this.http.post(`${CONFIG.URL_BASE}/audiobook/create`, this.form, { headers: this.headers });
    req.subscribe({
      next: () => { this.saving = false; modalRef.close(); this.load(); },
      error: () => { this.saving = false; this.formError = 'Save failed. Please try again.'; }
    });
  }

  delete(id: number): void {
    if (!confirm('Delete this audiobook?')) return;
    this.http.delete(`${CONFIG.URL_BASE}/audiobook/${id}`, { headers: this.headers })
      .subscribe({ next: () => this.load(), error: () => {} });
  }

  playAudio(url: string): void {
    this.playingUrl = this.playingUrl === url ? null : url;
  }

  formatDuration(mins: number): string {
    if (!mins) return '—';
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    return h > 0 ? `${h}h ${m}m` : `${m}m`;
  }

  private blankForm(): AudioBook {
    return {
      title: '', author: '', narrator: '', durationMinutes: 0,
      fileUrl: '', coverUrl: '', isbn: '', language: 'eng',
      genre: '', publisher: '', description: '', format: 'MP3',
      active: true
    };
  }
}
