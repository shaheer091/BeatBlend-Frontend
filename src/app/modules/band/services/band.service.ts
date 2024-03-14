import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BandService {

  constructor(private http:HttpClient) { }

  bandApi:any='http://localhost:3000/band'

  bandGetHome():Observable<any>{
    return this.http.get(`${this.bandApi}/home`)
  }
}
