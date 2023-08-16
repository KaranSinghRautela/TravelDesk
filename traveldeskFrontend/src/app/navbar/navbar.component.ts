import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  constructor(private authService: AuthService,
    private toastService: NgToastService) {}

  IsLoggedIn(): boolean {
    return this.authService.IsLoggedIn();
  }

  logout(): void {
    this.authService.logout();
    this.toastService.success({
      detail:"Loggged Out Successfully",
      duration:2000
    })
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
