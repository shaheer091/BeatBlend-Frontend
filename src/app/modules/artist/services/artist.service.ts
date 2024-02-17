import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArtistService {

  constructor(private http:HttpClient) { }

  artistApi = 'http://localhost:3000/artist'

  artistAddSong (data:any):Observable<any>{
    return this.http.post(`${this.artistApi}/addSong`,{data})
  }
}
