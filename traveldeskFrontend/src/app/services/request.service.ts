import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Request } from '../models/Request';
import { UserService } from './user.service';
import { UserRequestViewModel } from '../models/UserRequestViewModel';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(private _http : HttpClient,private authService:AuthService) { }

   baseUrl  = "http://localhost:5006/api/Requests/" ;
   userReqUrl  = "http://localhost:5006/api/Requests/user/" ;
   managerReqUrl  = "http://localhost:5006/api/Requests/manager/" ;
   hradminReqUrl  = "http://localhost:5006/api/Requests/hradmin/" ;
   reqDetailUrl  = "http://localhost:5006/api/Requests/detail/" ;

   GetRequests()
   {
      return this._http.get<Request[]>(this.baseUrl) ;
   }

   AddRequest(req : Request)
   {
    console.log(req)
     return this._http.post<Request>(this.baseUrl, 
       JSON.stringify(req), {
         headers: new HttpHeaders({
           'Content-Type': 'application/json',
           'Accept': 'application/json'
         })
       }
     )
    } 
UpdateRequest(id:number,req : Request)
    {console.log(id)
      console.log(JSON.stringify(req))
      return this._http.put<Request>(this.baseUrl+id, 
        JSON.stringify(req), {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          })
        }
      )
     } 
     
 
  GetRequestById(id : number)
  {
    return this._http.get<Request>(this.baseUrl + id)
  }

  DeleteRequestById(id : number)
  {
    console.log("delete service is called...." +id)
    return this._http.delete<any>(this.baseUrl + id)
  }
  GetUserRequestsList(id : number)
  {
    return this._http.get<UserRequestViewModel[]>(this.userReqUrl + id)
  }
GetUserRequestDetail(id:number){
  return this._http.get<UserRequestViewModel>(this.reqDetailUrl + id)
}

  GetManagerRequestsList(id : number)
  {
    return this._http.get<UserRequestViewModel[]>(this.managerReqUrl + id)
  }
  GetHRAdminRequestsList()
  {
    return this._http.get<UserRequestViewModel[]>(this.hradminReqUrl)
  }

}
