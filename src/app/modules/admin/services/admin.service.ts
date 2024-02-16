import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(private http: HttpClient) {}

  getAllUsersApi = 'http://localhost:3000/admin/seeAllUsers';
  getAllArtistApi = 'http://localhost:3000/admin/seeAllArtist';
  getAllPendingApi = 'http://localhost:3000/admin/seeAllPending';
  getAllAdminApi = 'http://localhost:3000/admin/seeAllAdmin';
  approveUserApi = 'http://localhost:3000/admin/approveUser';

  getAllUsers(): Observable<any> {
    return this.http.get(this.getAllUsersApi);
  }

  getAllArtist(): Observable<any> {
    return this.http.get(this.getAllArtistApi);
  }

  getAllPending(): Observable<any> {
    return this.http.get(this.getAllPendingApi);
  }
  getAllAdmin():Observable<any>{
    return this.http.get(this.getAllAdminApi)
  }

  approveUser(data: any): Observable<any> {
    return this.http.patch(this.approveUserApi, data);
  }
}
