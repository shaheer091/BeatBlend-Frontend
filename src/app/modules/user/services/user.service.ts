import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  profileApi = 'http://localhost:3000/user/profile';
  phoneVerifyApi = 'http://localhost:3000/user/verifyPhone'
  phoneVerifyOtp = 'http://localhost:3000/user/verifyOtp'
  beArtistApi = 'http://localhost:3000/user/artistVerify'

  getUserProfile(): Observable<any> {
    return this.http.get(this.profileApi);
  }

  updateProfile(data:any):Observable<any>{
    return this.http.patch(this.profileApi,data);
  }

  verifyPhone(phNo:any):Observable<any>{
    console.log(phNo);
    return this.http.post(this.phoneVerifyApi,{phone:phNo})
  }

  verifyPhoneOtp(otp:number,phone:number):Observable<any>{
    console.log(otp);
    return this.http.post(this.phoneVerifyOtp,{otp,phone})
  }

  artistVerification(socialMediaLink:any){
    console.log(socialMediaLink);
    return this.http.post(this.beArtistApi,{socialMediaLink})
  }
}
