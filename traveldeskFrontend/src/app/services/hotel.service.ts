import { Injectable } from '@angular/core';
import { Hotel } from '../models/Hotel';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class HotelService {
  constructor(private _http: HttpClient) {}
  baseUrl = 'http://localhost:5006/api/HotelDetails';
  GetHotelDetails() {
    return this._http.get<Hotel[]>(this.baseUrl);
  }
  GetHotelDetailsById(Id: number) {
    return this._http.get<Hotel>(this.baseUrl + Id);
  }

  AddHotelDetails(hotel: Hotel) {
    console.log(this.baseUrl);
    console.log(hotel);
    return this._http.post<Hotel>(
      this.baseUrl,

      JSON.stringify(hotel),
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',

          Accept: 'application/json',
        }),
      }
    );
  }
}
