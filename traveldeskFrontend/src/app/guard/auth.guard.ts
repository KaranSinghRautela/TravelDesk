import {
  CanActivateFn,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
  Router,
} from '@angular/router';

import { AuthService } from '../services/auth.service';

import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const authService = inject(AuthService); // Instantiate the AuthService

  const router = inject(Router);

  // Call the isLoggedIn() method from the AuthService to check authentication

  const isAuthenticated = authService.IsLoggedIn(); // Assuming the method returns a boolean indicating authentication status

  if (!isAuthenticated) {
    router.navigate(['/login']);

    return false;
  }

  const requiredRoles: string[] = route.data['roles'];

  const userRole: string = authService.getUserRole();

  if (!requiredRoles.includes(userRole)) {
    router.navigate(['/unauthorized']);

    return false;
  }

  return true;
};
