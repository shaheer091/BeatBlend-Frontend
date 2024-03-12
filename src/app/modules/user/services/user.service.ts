import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}
  userApi = 'http://localhost:3000/user';

  getUserProfile(): Observable<any> {
    return this.http.get(`${this.userApi}/profile`);
  }

  updateProfile(data: any): Observable<any> {
    return this.http.put(`${this.userApi}/profile`, data);
  }

  verifyPhone(phNo: any): Observable<any> {
    return this.http.post(`${this.userApi}/verifyPhone`, { phone: phNo });
  }

  verifyPhoneOtp(otp: number, phone: number): Observable<any> {
    return this.http.post(`${this.userApi}/verifyOtp`, { otp, phone });
  }

  artistVerification(socialMediaLink: any): Observable<any> {
    return this.http.post(`${this.userApi}/artistVerify`, { socialMediaLink });
  }

  searchUser(text: string): Observable<any> {
    return this.http.get(`${this.userApi}/search/${text}`);
  }

  followAndUnfollowUser(userId: any): Observable<any> {
    return this.http.post(`${this.userApi}/follow`, { userId });
  }

  userGetSong(): Observable<any> {
    return this.http.get(`${this.userApi}/getSong`);
  }

  getSettingsPage(): Observable<any> {
    return this.http.get(`${this.userApi}/settings`);
  }

  favAndUnfav(songId: any): Observable<any> {
    return this.http.post(`${this.userApi}/favUnfav`, { songId });
  }

  getFavSongs(): Observable<any> {
    return this.http.get(`${this.userApi}/favorite`);
  }

  searchSong(searchText: string): Observable<any> {
    if (searchText != '') {
      return this.http.get(`${this.userApi}/searchSong/${searchText}`);
    } else {
      return of();
    }
  }
  
  getPlaylist():Observable<any>{
    return this.http.get(`${this.userApi}/getPlaylist`)
  }

  createPlaylist(data: any): Observable<any> {
    return this.http.post(`${this.userApi}/createPlaylist`, data);
  }

  getSinglePlaylist(playlistID:string) : Observable <any>{
    return this.http.get(`${this.userApi}/singlePlaylist/${playlistID}`)
  }

  removeFromPlaylist(songId:any):Observable<any>{
    return this.http.delete(`${this.userApi}/removeFromPlaylist/${songId}`)
  }

  deletePlaylist(playlistId:any):Observable<any>{
    return this.http.delete(`${this.userApi}/deletePlaylist/${playlistId}`)
  }

  likeAndUnlikeSong(songId:any):Observable<any>{
    return this.http.post(`${this.userApi}/likeUnlikeSong`,{songId})
  }

  addComment(data:any):Observable<any>{
    console.log(data);
    return this.http.post(`${this.userApi}/addComment`,data)
  }

  
}
