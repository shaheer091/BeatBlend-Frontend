import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  constructor(private http: HttpClient) {}

  api = 'http://192.168.0.66:3000/signup';
  otpVerificationApi = 'http://192.168.0.66:3000/otp-verify';
  loginApi = 'http://192.168.0.66:3000/login'

  apiCall(data: any): Observable<any> {
    return this.http.post(this.api, data);
  }
  apiVerifyOtp(data: any): Observable<any> {
    return this.http.post(this.otpVerificationApi, data);
  }
  apiLogin(data:any):Observable<any>{
    return this.http.post(this.loginApi,data)
  }
}
