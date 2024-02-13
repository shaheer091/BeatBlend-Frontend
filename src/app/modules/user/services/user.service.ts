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
}
