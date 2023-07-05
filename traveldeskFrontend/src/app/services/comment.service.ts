import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Comment } from '../models/Comment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private _http: HttpClient) { }
  BaseUrl = 'http://localhost:5006/api/comments/';
  reqcommentUrl = 'http://localhost:5006/api/comments/request/';

  AddComment(comment: Comment)
  {
   return this._http.post<Comment>(this.BaseUrl,
     JSON.stringify(comment),
     {
       headers: new HttpHeaders({
         'Content-Type': 'application/json',
         'Accept': 'application/json'
       })
     })
  }
  GetCommentsByRequestId(reqId:number):Observable<Comment[]>
  {
    return this._http.get<Comment[]>(this.reqcommentUrl + reqId) ;
  }
}
