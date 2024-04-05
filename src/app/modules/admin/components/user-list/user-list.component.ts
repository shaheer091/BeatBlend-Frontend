import { Component, OnDestroy, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { CommonService } from 'src/app/services/common.service';
import { Observable, Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit, OnDestroy {
  constructor(
    private adminServ: AdminService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  getAllUser$ = new Subscription();
  changeDeleteStatus$ = new Subscription();
  changeBlockStatus$ = new Subscription();

  userData: any;
  message: any;
  success: any;
  userId: any;
  showDelDiv: Boolean = false;
  togle = false;
  showLoading:any;

  ngOnInit(): void {
    this.showLoading=true;
    this.getUser();
  }
  getUser() {
    this.getAllUser$ = this.adminServ.getAllUsers().subscribe({
      next: (res) => {
        this.showLoading=false;
        this.success = res.success;
        if (this.success) {
          this.userData = res.user;
        } else {
          this.message = res.message;
        }
      },
      error: (err) => {
        alert(err.error.message);
      },
    });
  }

  deleteUser(event: any, userId: any) {
    event.stopPropagation();
    this.userId = userId;
    this.showDelDiv = true;
    this.togle = !this.togle;
  }

  confirmDelete() {
    this.showLoading=true;
    this.changeDeleteStatus$ = this.adminServ
      .changeDeleteStatus(this.userId)
      .subscribe({
        next: (res) => {
          this.showLoading=false;
          this.getUser();
        },
        error: (err) => {
          alert(err.error.message);
        },
      });
    this.showDelDiv = false;
  }

  getUserDetails(userId: any) {
    this.router.navigate([`/admin/user-profile/${userId}`]);
  }

  blockUser(event: any, userId: any) {
    this.showLoading=true;
    event.stopPropagation();
    this.changeBlockStatus$ = this.adminServ
      .changeBlockStatus(userId)
      .subscribe({
        next: (res) => {
          this.showLoading=false;
          this.getUser();
        },
        error: (err) => {
          alert(err.error.message);
        },
      });
  }
  ngOnDestroy(): void {
    this.getAllUser$?.unsubscribe();
    this.changeBlockStatus$?.unsubscribe();
    this.changeDeleteStatus$?.unsubscribe();
  }
}
