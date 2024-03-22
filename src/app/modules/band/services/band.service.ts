import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BandService {
  constructor(private http: HttpClient) {}

  bandApi: any = 'http://localhost:3000/band';

  bandGetHome(): Observable<any> {
    return this.http.get(`${this.bandApi}/home`);
  }

  bandAddSong(data: any): Observable<any> {
    return this.http.post(`${this.bandApi}/addSong`, data);
  }

  bandGetMembers(): Observable<any> {
    return this.http.get(`${this.bandApi}/getBandMembers`);
  }

  removeBandMember(userId: any): Observable<any> {
    return this.http.patch(`${this.bandApi}/removeFromBand`, { userId });
  }

  searchArtist(searchText: String): Observable<any> {
    return this.http.get(`${this.bandApi}/search/${searchText}`);
  }

  addBandMember(artistId: any): Observable<any> {
    return this.http.patch(`${this.bandApi}/addToBand`, {artistId});
  }

  getBandSongs():Observable<any>{
    return this.http.get(`${this.bandApi}/songs`)
  }

  getBandSingleSong(songId:any):Observable<any>{
    return this.http.get(`${this.bandApi}/getSong/${songId}`)
  }

  bandEditSong(data:any,songId:any):Observable<any>{
    return this.http.patch(`${this.bandApi}/editSong/${songId}`, {data})
  }

  bandAddProfile(data:any):Observable<any>{
    return this.http.post(`${this.bandApi}/addProfile`,data);
  }

  bandGetProfile():Observable<any>{
    return this.http.get(`${this.bandApi}/getProfile`)
  }
}
