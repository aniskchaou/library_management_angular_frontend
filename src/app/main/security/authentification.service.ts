import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import CONFIG from '../urls/urls';

export interface JwtAuthResponse {
  accessToken: string;
  refreshToken: string;
  tokenType: string;
  username: string;
  roles: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthentificationService {
  private readonly ACCESS_TOKEN_KEY = 'accessToken';
  private readonly REFRESH_TOKEN_KEY = 'refreshToken';
  private readonly USERNAME_KEY = 'username';
  private readonly ROLES_KEY = 'roles';

  constructor(private httpClient: HttpClient, private router: Router) {}

  authenticate(username: string, password: string): Observable<JwtAuthResponse> {
    return this.httpClient
      .post<JwtAuthResponse>(CONFIG.URL_BASE + '/api/auth/login', { username, password })
      .pipe(
        tap((response) => {
          localStorage.setItem(this.ACCESS_TOKEN_KEY, response.accessToken);
          localStorage.setItem(this.REFRESH_TOKEN_KEY, response.refreshToken);
          localStorage.setItem(this.USERNAME_KEY, response.username);
          localStorage.setItem(this.ROLES_KEY, response.roles);
        })
      );
  }

  refreshToken(): Observable<{ accessToken: string }> {
    const refreshToken = localStorage.getItem(this.REFRESH_TOKEN_KEY);
    return this.httpClient
      .post<{ accessToken: string }>(CONFIG.URL_BASE + '/api/auth/refresh', { refreshToken })
      .pipe(
        tap((response) => {
          localStorage.setItem(this.ACCESS_TOKEN_KEY, response.accessToken);
        })
      );
  }

  getAccessToken(): string | null {
    return localStorage.getItem(this.ACCESS_TOKEN_KEY);
  }

  getUsername(): string | null {
    return localStorage.getItem(this.USERNAME_KEY);
  }

  getRoles(): string | null {
    return localStorage.getItem(this.ROLES_KEY);
  }

  isSuperAdmin(): boolean {
    const roles = this.getRoles() || '';
    return roles.includes('SUPER_ADMIN');
  }

  isUserLoggedIn(): boolean {
    const token = this.getAccessToken();
    if (!token) return false;
    // Check token expiry by decoding payload (no library needed for basic check)
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp * 1000 > Date.now();
    } catch {
      return false;
    }
  }

  logOut(): void {
    this.httpClient.post(CONFIG.URL_BASE + '/api/auth/logout', {}).subscribe({
      error: () => {} // ignore errors on logout
    });
    localStorage.removeItem(this.ACCESS_TOKEN_KEY);
    localStorage.removeItem(this.REFRESH_TOKEN_KEY);
    localStorage.removeItem(this.USERNAME_KEY);
    localStorage.removeItem(this.ROLES_KEY);
    this.router.navigate(['/login']);
  }
}
