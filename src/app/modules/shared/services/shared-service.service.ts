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
    return this.http.patch(`${this.api}/artist/acceptBandInvitation/`,{bandId})
  }

  
}
