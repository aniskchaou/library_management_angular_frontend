import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { OpacAuthService } from '../../opac/opac-auth.service';
import CONFIG from 'src/app/main/urls/urls';

@Component({
  selector: 'app-guest-navbar',
  templateUrl: './guest-navbar.component.html',
  styleUrls: ['./guest-navbar.component.css'],
  standalone: false,
})
export class GuestNavbarComponent implements OnInit {
  @Input() activePage = '';

  libraryName = 'Library Lab';
  logoUrl = '';
  menuOpen = false;

  constructor(
    private router: Router,
    public auth: OpacAuthService,
    private http: HttpClient,
  ) {}

  ngOnInit(): void {
    this.logoUrl = CONFIG.URL_BASE + '/version/get/logo';
    this.http.get<any>(CONFIG.URL_BASE + '/settings/all').subscribe({
      next: list => {
        const s = Array.isArray(list) ? list[0] : list;
        if (s?.name) this.libraryName = s.name;
      },
      error: () => {},
    });
  }

  go(path: string): void { this.router.navigate([path]); this.menuOpen = false; }

  toggleMenu(): void { this.menuOpen = !this.menuOpen; }

  get memberInitial(): string {
    return this.auth.member?.firstname?.[0]?.toUpperCase() || '';
  }
}
