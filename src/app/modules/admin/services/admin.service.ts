import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(private http: HttpClient) {}
  adminApi = 'http://localhost:3000/admin';

  getAllUsers(): Observable<any> {
    return this.http.get(`${this.adminApi}/seeAllUsers`);
  }

  getAllArtist(): Observable<any> {
    return this.http.get(`${this.adminApi}/seeAllArtist`);
  }

  getAllPending(): Observable<any> {
    return this.http.get(`${this.adminApi}/seeAllPending`);
  }
  getAllAdmin(): Observable<any> {
    return this.http.get(`${this.adminApi}/seeAllAdmin`);
  }
  deleteUser(userId: any): Observable<any> {
    return this.http.patch(`${this.adminApi}/deleteUser`, { userId });
  }
  unDeleteUser(userId: any): Observable<any> {
    return this.http.patch(`${this.adminApi}/unDeleteUser`, { userId });
  }
}
