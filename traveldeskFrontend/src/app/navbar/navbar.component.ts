import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  constructor(private authService: AuthService) {}

  IsLoggedIn(): boolean {
    return this.authService.IsLoggedIn();
  }

  logout(): void {
    this.authService.logout();
  }

  getUserRole(): string {
    // console.log(this.authService.getUserRole)
    return this.authService.getUserRole();
  }
  getHomeLink():string{
    var userRole = this.authService.getUserRole();
    var link = '';
    if(userRole=='Admin'){
      link= '/userList';
    }
    else{
      link='/requests'
    }
    return link;
  }
  GetUserName():string{
    return this.authService.getUserName();
  }
}
