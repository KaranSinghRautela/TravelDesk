import { Injectable } from '@angular/core';
import{HttpClient,HttpHeaders} from '@angular/common/http';
import { User } from '../models/User';
import { Manager } from '../models/Manager';

import { map } from 'rxjs';
import { UserViewModel } from '../models/UsersViewModel';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _http: HttpClient) {

   }
   baseUrl="http://localhost:5006/api/User/";
   userviewurl = "http://localhost:5006/api/User/usersview/"
   managerUrl = "http://localhost:5006/api/User/managers"
  //  managerUrl = "http://localhost:5006/api/User/managers";
   userRequestsUrl = "http://localhost:5006/api/User/user/requests/";
   managerRequestsUrl = "http://localhost:5006/api/User/manager/requests/";

   GetManagerList()
   {
    console.log("in get manager service")
    return this._http.get<Manager[]>(this.managerUrl);
   }


   GetUsers()
   {
    console.log("in get user service")
    return this._http.get<User[]>(this.baseUrl);
   }

   GetUsersList()
   {
    console.log("in get user service")
    return this._http.get<UserViewModel[]>(this.baseUrl+"usersview");
   }
   
   GetUsersListById(id:number)
   {
    console.log("in get user service")
    return this._http.get<UserViewModel[]>(this.userviewurl+id);
   }

   GetUsersById(id:number)
   {
    return this._http.get<User>(this.baseUrl+id)
   }

   DeleteUserBy(id:number)
   {
    console.log("in delete service..")
    return this._http.delete<any>(this.baseUrl+id)
    
   }
   AddUser(user: User)
   {
    console.log("InService")
    return this._http.post<User>(this.baseUrl,
      JSON.stringify(user),
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        })
      })
   }

   GetUserRequests(id:number)
   {
    console.log("in get userrequests service")
    return this._http.get<Request[]>(this.userRequestsUrl+id);
   }

   GetManagerRequests(id:number)
   {
    console.log("in get managerrequests service")
    return this._http.get<Request[]>(this.managerRequestsUrl+id);
   }

   EditUser(id:number,user:User)
   {
    console.log("in the update service")
    console.log(user)
      return this._http.put<User>(this.baseUrl +id,  JSON.stringify(user),
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        })
      })

    }}