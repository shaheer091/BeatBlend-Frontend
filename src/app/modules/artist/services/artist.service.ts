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
    return this.http.post(`${this.artistApi}/addSong`, data)
  }

  artistGetSongs ():Observable<any>{
    return this.http.get(`${this.artistApi}/songs`)
  }
  
  artistDeleteSong(songId:any):Observable<any>{
    return this.http.delete(`${this.artistApi}/deleteSong/${songId}`)
  }
  
  artistGetProfile():Observable<any>{
    return this.http.get(`${this.artistApi}/profile`)
  }
  
  artistUpdateProfile(profileDetails:any):Observable<any>{
    return this.http.patch(`${this.artistApi}/profile`,{profileDetails})
  }

}
