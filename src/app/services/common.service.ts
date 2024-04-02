import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { SharedServiceService } from '../modules/shared/services/shared-service.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  api = environment.apiUrl;
  decodedToken = this.sharedServ.parseJwt();
  role: any = this.decodedToken?.role ? this.decodedToken?.role : '';
  toggleToken$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    !!localStorage.getItem('token')
  );

  constructor(
    private http: HttpClient,
    private sharedServ: SharedServiceService
  ) {
    console.log(this.api);
    
  }

  // Signup function
  apiCall(data: any): Observable<any> {
    return this.http.post(`${this.api}/signup`, data);
  }

  apiVerifyOtp(data: any): Observable<any> {
    return this.http.post(`${this.api}/otp-verify`, data);
  }

  apiLogin(data: any): Observable<any> {
    console.log(this.api);
    console.log('anuzzzzzz');
    
    
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
    return this.role ? this.role == 'user' : this.decodedToken.role === 'user';
  }

  isAdmin() {
    return this.role
      ? this.role == 'admin'
      : this.decodedToken.role === 'admin';
  }

  isArtist() {
    return this.role
      ? this.role == 'artist'
      : this.decodedToken.role === 'artist';
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
