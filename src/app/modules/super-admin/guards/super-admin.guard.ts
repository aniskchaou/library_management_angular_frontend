import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthentificationService } from '../../../main/security/authentification.service';

@Injectable({ providedIn: 'root' })
export class SuperAdminGuard implements CanActivate {
  constructor(private authService: AuthentificationService, private router: Router) {}

  canActivate(): boolean {
    if (!this.authService.isUserLoggedIn()) {
      this.router.navigate(['/login']);
      return false;
    }
    if (!this.authService.isSuperAdmin()) {
      this.router.navigate(['/dashboard']);
      return false;
    }
    return true;
  }
}
