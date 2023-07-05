import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const loginGuard: CanActivateFn = (route:ActivatedRouteSnapshot, state:RouterStateSnapshot) => {
  const authService = inject (AuthService);
  const router = inject (Router);
  if (authService.IsLoggedIn()) {
    // User is already logged in, redirect to a different page
    authService.logout();
    return false;
  }
  return true;
};