import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthentificationService } from 'src/app/main/security/authentification.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css'],
})
export class TopbarComponent implements OnInit {
  @Input() menuI18n;
  user = sessionStorage.getItem('username');
  constructor(
    private authService: AuthentificationService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  logout() {
    this.authService.logOut();
    this.router.navigate(['/login']);
  }
}
