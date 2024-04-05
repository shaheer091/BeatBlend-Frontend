import { Component, OnDestroy, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { Subscription } from 'rxjs';
import { SharedServiceService } from 'src/app/modules/shared/services/shared-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admins-list',
  templateUrl: './admins-list.component.html',
  styleUrls: ['./admins-list.component.css'],
})
export class AdminsListComponent implements OnInit, OnDestroy {
  constructor(
    private adminServ: AdminService,
    private sharedServ: SharedServiceService,
    private router: Router
  ) {}
  adminData: any;
  message: any;
  success: any;

  getAdmins$ = new Subscription();
  userId: any = this.sharedServ.parseJwt();
  showLoading:any;

  ngOnInit(): void {
    this.showLoading=true;
    this.getAdmins$ = this.adminServ.getAllAdmin().subscribe({
      next: (res) => {
        this.showLoading=false;
        this.success = res.success;
        if (this.success) {
          this.adminData = res.admin;
        } else {
          this.message = res.message;
        }
      },
      error: (err) => {
        alert(err.error.message);
      },
    });
  }
  chatWith(userId: any) {
    this.router.navigate([`/user/chats/${userId}`]);
  }
  ngOnDestroy(): void {
    this.getAdmins$?.unsubscribe();
  }
}
