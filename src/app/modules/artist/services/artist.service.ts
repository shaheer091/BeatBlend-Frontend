import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ArtistService {

  constructor(private http:HttpClient) { }

  artistApi = `${environment.apiUrl}/artist`;

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

  artistGetSongDetails(songId:any):Observable<any>{
    return this.http.get(`${this.artistApi}/getSongDetails/${songId}`)
  }

  artistEditSongDetails(songId:any,data:any):Observable<any>{
    return  this.http.patch(`${this.artistApi}/editSongDetails/${songId}`,data);
  }

  artistGetHome():Observable<any>{
    return this.http.get(`${this.artistApi}/home`);
  }

  searchArtist(searchText:any):Observable<any>{
    return this.http.get(`${this.artistApi}/searchArtist/${searchText}`);
  }

  createBand(data:any):Observable<any>{
    return this.http.post(`${this.artistApi}/createBand`,data)
  }
  

}
