import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}
  userApi='http://localhost:3000/user';


  getUserProfile(): Observable<any> {
    return this.http.get(`${this.userApi}/profile`);
  }

  updateProfile(data:any):Observable<any>{
    return this.http.put(`${this.userApi}/profile`,data);
  }

  verifyPhone(phNo:any):Observable<any>{
    console.log(phNo);
    return this.http.post(`${this.userApi}/verifyPhone`,{phone:phNo})
  }

  verifyPhoneOtp(otp:number,phone:number):Observable<any>{
    console.log(otp);
    return this.http.post(`${this.userApi}/verifyOtp`,{otp,phone})
  }

  artistVerification(socialMediaLink:any):Observable<any>{
    console.log(socialMediaLink);
    return this.http.post(`${this.userApi}/artistVerify`,{socialMediaLink})
  }

  searchSong(text:string):Observable<any>{
    return this.http.post(`${this.userApi}/search`,{text})
  }
}
