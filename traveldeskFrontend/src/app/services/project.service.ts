import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from '../models/Project';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private _http : HttpClient) { }
  baseUrl = 'http://localhost:5006/api/Projects/projects'

  GetProjects() : Observable<Project[]>
  {
    return this._http.get<Project[]>(this.baseUrl) ;
  }
}
