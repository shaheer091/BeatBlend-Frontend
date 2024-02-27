import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedServiceService {

  constructor(private http:HttpClient) { }

  api='http://localhost:3000'

  role=localStorage.getItem('role')

  getSingleUser():Observable<any>{
    return this.http.get(`${this.api}/singleUser`)
  }
}
