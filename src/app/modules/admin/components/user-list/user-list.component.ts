import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  constructor(private adminServ: AdminService) {}
  userData: any;
  message: any;
  success: any;
  userId:any;
  showDelDiv:Boolean=false;
  togle=false
  ngOnInit(): void {
    this.getUser()
  }
  getUser(){
    this.adminServ.getAllUsers().subscribe((res) => {
      this.success = res.success;
      if (this.success) {
        this.userData = res.user;
      } else {
        this.message = res.message;
      }
    });
  }

  deleteUser(userId: any) {
    this.userId=userId;
    this.showDelDiv=true;
    this.togle=!this.togle;
  }

  confirmDelete(){
    this.adminServ.changeDeleteStatus(this.userId).subscribe((res) => {
      this.getUser()
    });
    this.showDelDiv=false;
  }
}
