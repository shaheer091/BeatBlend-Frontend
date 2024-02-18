import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-pending-users-list',
  templateUrl: './pending-users-list.component.html',
  styleUrls: ['./pending-users-list.component.css'],
})
export class PendingUsersListComponent implements OnInit {
  constructor(private adminServ: AdminService) {}
  pendingData: any;
  message: any;
  success: any;
  pendingUserId:any
  // showPopUp:Boolean=false;
  approve:Boolean=false;
  decline:Boolean=false;

  ngOnInit(): void {
    this.adminServ.getAllPending().subscribe((res) => {
      this.success = res.success;
      if (this.success) {
        this.pendingData = res.pending;
      } else {
        this.message = res.message;
      }
    });
  }

  showApproveDiv(userId:any){
    // this.showPopUp=true;
    this.approve=true;
    this.pendingUserId=userId;
  }
  showDeclineDiv(userId:any){
    this.pendingUserId=userId;
    // this.showPopUp=true;
    this.decline=true;
  }

  approveUser() {
    this.adminServ.pendingApproval(this.pendingUserId).subscribe((res) => {
      console.log(res.message);
    });
    // this.showPopUp=false;
    this.approve=false;
    this.decline=false;
  }

  declineUser(){
    this.adminServ.pendingDecline(this.pendingUserId).subscribe((res)=>{
      console.log(res);
    })
    this.approve=false;
    this.decline=false;
  }
}
