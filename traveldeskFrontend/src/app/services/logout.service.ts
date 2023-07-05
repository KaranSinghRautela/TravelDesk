import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})

export class LogoutService {
  constructor(private authService: AuthService, private router: Router) { }
  logout() {
    // Perform any necessary logout logic, such as clearing session, removing tokens, etc.
    this.authService.logout();
    // Redirect to the login page or any other desired route
    this.router.navigate(['/login']);
  }

}