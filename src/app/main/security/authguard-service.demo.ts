import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

/**
 * Demo-mode auth guard — always grants access so every route is reachable
 * without a real login or backend session.
 */
@Injectable({
  providedIn: 'root',
})
export class AuthguardService {
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    return true;
  }
}
