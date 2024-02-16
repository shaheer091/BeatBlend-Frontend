import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  constructor(private http: HttpClient) {}

  api='http://localhost:3000';

  apiCall(data: any): Observable<any> {
    return this.http.post(`${this.api}/signup`, data);
  }
  apiVerifyOtp(data: any): Observable<any> {
    return this.http.post(`${this.api}/otp-verify`, data);
  }
  apiLogin(data: any): Observable<any> {
    return this.http.post(`${this.api}/login`, data);
  }

  isLoggedIn() {
    return !!localStorage.getItem('token');
  }
  role: String | null = localStorage.getItem('role');
  isUser() {
    return this.role == 'user';
  }
  isAdmin() {
    return this.role == 'admin';
  }
  isArtist() {
    return this.role == 'artist';
  }
}
