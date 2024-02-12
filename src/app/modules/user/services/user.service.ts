import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  profileApi = 'http://localhost:3000/user/profile';

  getUserProfile(): Observable<any> {
    return this.http.get(`${this.profileApi}`);
  }
}
