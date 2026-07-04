import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import CONFIG from 'src/app/main/urls/urls';

interface BookRecommendation {
  title: string;
  author: string;
  reason?: string;
  isbn?: string;
}

@Component({
  selector: 'app-ai-recommendations',
  templateUrl: './ai-recommendations.component.html',
  styleUrls: ['./ai-recommendations.component.css'],
  standalone: false,
})
export class AiRecommendationsComponent implements OnInit {
  private base = CONFIG.URL_BASE;
  private headers = new HttpHeaders({ Authorization: 'Basic ' + btoa('admin:admin') });

  memberId: number | null = null;
  count = 5;
  recommendations: BookRecommendation[] = [];
  loading = false;
  error = '';
  hasLoaded = false;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // Pre-fill member id from member portal session if available
    const stored = localStorage.getItem('mp_member_id');
    if (stored) this.memberId = Number(stored);
  }

  getRecommendations(): void {
    if (!this.memberId) { this.error = 'Please enter a member ID.'; return; }
    this.loading = true;
    this.error = '';
    this.recommendations = [];

    this.http.post<BookRecommendation[]>(
      `${this.base}/api/recommendations`,
      { memberId: this.memberId, count: this.count },
      { headers: this.headers }
    ).subscribe({
      next: data => {
        this.recommendations = data;
        this.loading = false;
        this.hasLoaded = true;
      },
      error: err => {
        this.error = err?.error?.message || 'Failed to fetch recommendations. Check API key configuration.';
        this.loading = false;
      }
    });
  }
}
