import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedServiceService {

  songUrlSource = new BehaviorSubject<string>('');
  songUrl$ = this.songUrlSource.asObservable();
  constructor(private http:HttpClient) { }

  api='http://localhost:3000'

  // role=localStorage.getItem('role')


  parseJwt() {
    const token = localStorage.getItem('token')
    if (!token) {
      return;
    }
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
  }

  
  getSingleUser():Observable<any>{
    return this.http.get(`${this.api}/singleUser`)
  }

  setSongUrl(songUrl: string) {
    this.songUrlSource.next(songUrl);
  }

  getFollowingList():Observable<any>{
    return this.http.get(`${this.api}/following-list`)
  }

  getFollowersList():Observable<any>{
    return this.http.get(`${this.api}/followers-list`)
  }

  getNotification():Observable<any>{
    return this.http.get(`${this.api}/notifications`)
  }

  acceptInvitation(bandId:any):Observable<any>{
    return this.http.patch(`${this.api}/artist/acceptBandInvitation`,{bandId})
  }

  declineInvitation(bandId:any):Observable<any>{
    return this.http.patch(`${this.api}/artist/decllineBandInvitation`,{bandId})
  }

  getMessage():Observable<any>{
    return this.http.get(`${this.api}/chat/userMessages`)
  }
  
}
