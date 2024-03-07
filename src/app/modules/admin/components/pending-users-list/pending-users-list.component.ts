import { Component, OnDestroy, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-pending-users-list',
  templateUrl: './pending-users-list.component.html',
  styleUrls: ['./pending-users-list.component.css'],
})
export class PendingUsersListComponent implements OnInit, OnDestroy {
  constructor(
    private adminServ: AdminService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  pendingData: any;
  message: any;
  success: any;
  pendingUserId: any;
  // showPopUp:Boolean=false;
  approve: Boolean = false;
  decline: Boolean = false;

  getPendingUser$ = new Subscription();
  approve$ = new Subscription();
  decline$ = new Subscription();

  ngOnInit(): void {
    this.getPending();
  }

  getPending() {
    this.getPendingUser$ = this.adminServ.getAllPending().subscribe({
      next: (res) => {
        this.success = res.success;
        if (this.success) {
          this.pendingData = res.pending;
        } else {
          this.message = res.message;
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  showApproveDiv(event: any, userId: any) {
    event.stopPropagation();
    // this.showPopUp=true;
    this.approve = true;
    this.pendingUserId = userId;
  }
  showDeclineDiv(event: any, userId: any) {
    event.stopPropagation();
    this.pendingUserId = userId;
    // this.showPopUp=true;
    this.decline = true;
  }

  approveUser() {
    this.approve$ = this.adminServ
      .pendingApproval(this.pendingUserId)
      .subscribe({
        next: (res) => {
          this.getPending();
        },
        error: (err) => {
          console.log(err);
        },
      });
    // this.showPopUp=false;
    this.approve = false;
    this.decline = false;
  }

  declineUser() {
    this.decline$ = this.adminServ
      .pendingDecline(this.pendingUserId)
      .subscribe({
        next: (res) => {
          this.getPending();
        },
        error: (err) => {
          console.log(err);
        },
      });
    this.approve = false;
    this.decline = false;
  }

  getUserDetails(userId: any) {
    const queryParams = {
      id: userId,
    };
    this.router.navigate(['/admin/user-profile'], {
      relativeTo: this.route,
      queryParams: queryParams,
    });
  }

  ngOnDestroy(): void {
    this.getPendingUser$?.unsubscribe();
    this.approve$?.unsubscribe();
    this.decline$?.unsubscribe();
  }
}
