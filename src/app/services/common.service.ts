import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  api = 'http://localhost:3000';
  role: String | null = localStorage.getItem('role');
  toggleToken$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    !!localStorage.getItem('token')
  );

  constructor(private http: HttpClient) {}

  // Signup function
  apiCall(data: any): Observable<any> {
    return this.http.post(`${this.api}/signup`, data);
  }

  apiVerifyOtp(data: any): Observable<any> {
    return this.http.post(`${this.api}/otp-verify`, data);
  }

  apiLogin(data: any): Observable<any> {
    return this.http.post(`${this.api}/login`, data);
  }

  getSingleUser(userId: any): Observable<any> {
    return this.http.get(`${this.api}/user-profile/${userId}`);
  }

  getSingleBand(bandId: any): Observable<any> {
    return this.http.get(`${this.api}/band-profile/${bandId}`);
  }

  isLoggedIn() {
    return !!localStorage.getItem('token');
  }

  isUser() {
    return this.role == 'user';
  }

  isAdmin() {
    return this.role == 'admin';
  }

  isArtist() {
    return this.role == 'artist';
  }
  isBand() {
    const isInBand = localStorage.getItem('isInBand');
    if (isInBand == 'true') {
      return true;
    } else {
      return false;
    }
  }
}
