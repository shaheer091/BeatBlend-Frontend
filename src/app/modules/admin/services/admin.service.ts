import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(private http: HttpClient) {}
  adminApi = `${environment.apiUrl}/admin`;

  getAdminHome():Observable<any>{
    return this.http.get(`${this.adminApi}/getHome`)
  }

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
  changeDeleteStatus(userId: any): Observable<any> {
    return this.http.patch(`${this.adminApi}/changeDeleteStatus`, { userId });
  }
  changeBlockStatus(userId:any):Observable<any>{
    return this.http.patch(`${this.adminApi}/changeBlockStatus`,{userId});
  }
  pendingApproval(userId:any):Observable<any>{
    return this.http.patch(`${this.adminApi}/approveUser`,{userId})
  }
  pendingDecline(userId:any):Observable<any>{
    return this.http.delete(`${this.adminApi}/declineUser/${userId}`)
  }
  changeSongBlockStatus(songId:any):Observable<any>{
    return this.http.patch(`${this.adminApi}/changeSongBlockStatus`,{ songId })
  }
}
