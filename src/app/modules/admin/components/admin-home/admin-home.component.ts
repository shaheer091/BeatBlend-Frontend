import { Component, OnInit } from '@angular/core';
import { SharedServiceService } from 'src/app/modules/shared/services/shared-service.service';
import { AdminService } from '../../services/admin.service';
import { filter } from 'rxjs';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css'],
})
export class AdminHomeComponent implements OnInit {
  constructor(
    private sharedServ: SharedServiceService,
    private adminServ: AdminService
  ) {}
  username: any;
  users: any;
  artists: any;
  pendingUsers:any;
  ngOnInit(): void {
    const decodedToken = this.sharedServ.parseJwt(
      localStorage.getItem('token')
    );
    this.username = decodedToken.username;
    this.getHome();
  }

  getHome() {
    this.adminServ.getAdminHome().subscribe({
      next: (res) => {
        if(res?.pendingUsers){
          this.pendingUsers=res?.pendingUsers;
        }
        const resp = res?.users;
        this.users = resp.filter((e: any) => {
          return e.role == 'user';
        });
        this.artists = resp.filter((e: any) => {
          return e.role == 'artist';
        });
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
