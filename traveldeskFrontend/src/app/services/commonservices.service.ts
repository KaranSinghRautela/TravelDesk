import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Common } from '../models/Common';

import { Roles } from '../models/Roles';
import { Department } from '../models/Department';
import { MealPreference } from '../models/MealPreference';
import { NoOfMeals } from '../models/NoOfMeals';
import { Cities } from '../models/Cities';
@Injectable({

  providedIn: 'root'

})

export class CommonserviceService {

  constructor(private _http : HttpClient) { }

  baseUrl="http://localhost:5006/api/CommonTypeReferences";

  GetRoles() : Observable<Roles[]>
  {
    return this._http.get<Roles[]>(this.baseUrl + "/role") ;
  }

  GetDepartment() : Observable<Department[]>
  {
    return this._http.get<Department[]>(this.baseUrl + "/Department") ;
  }

  GetCommon() : Observable<Common[]>
  {
    return this._http.get<Common[]>(this.baseUrl);
  }

  AddCommon(req : Common)
  {
    console.log("in ser  " + JSON.stringify(req))
    console.log("Request Addded....")
    return this._http.post<Common>(this.baseUrl,
      JSON.stringify(req),{
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        })

      }) }
      GetMealPreference():Observable<MealPreference[]>
      {
        console.log("xxx")
        return this._http.get<MealPreference[]>(this.baseUrl + "/MealPreference") ;
    
      }
      GetNoOfMeals():Observable<NoOfMeals[]>{
        return this._http.get<NoOfMeals[]>(this.baseUrl+"/NoOfMeals");
      }
      GetCities():Observable<Cities[]>
      {
        return this._http.get<Cities[]>(this.baseUrl + "/City") ;
  
      }
}