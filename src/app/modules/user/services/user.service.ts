import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  api = 'http://localhost:3000/user/signup';
  otpVerificationApi = 'http://localhost:3000/user/otp-verify';

  apiCall(data: any): Observable<any> {
    return this.http.post(this.api, data);
  }
  apiVerifyOtp(data: any): Observable<any> {
    return this.http.post(this.otpVerificationApi, data);
  }
}
