import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Credentials } from '../models/Credential';

import { Router } from '@angular/router';

import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private _http: HttpClient, private router: Router) {}

  BaseUrl = 'http://localhost:5006/api/Authentication';

  Authenticate(credential: Credentials) { 

    return this._http.post<Credentials>(
      this.BaseUrl,

      JSON.stringify(credential),
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',

          Accept: 'application/json',
        }),
      }
    );
  }

  IsLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
  }

  logout() {
    localStorage.removeItem('token');

    this.router.navigate(['/login']);
  }

  getUserId():number{
    const helper = new JwtHelperService();
    const token: any =localStorage.getItem("token");
    const decodeToken= helper.decodeToken(token);
    return decodeToken.Id;
  }

  getUserRole(): string {
    const helper = new JwtHelperService();

    const token: any = localStorage.getItem('token');

    if (token != null) {
      const decodeToken = helper.decodeToken(token);
      return decodeToken.rolename;
    }

    return 'guest';
  }

  getUserName():string{
    const helper = new JwtHelperService();
    const token: any =localStorage.getItem("token");
    const decodeToken= helper.decodeToken(token);
    return decodeToken.firstName;
  }
}
