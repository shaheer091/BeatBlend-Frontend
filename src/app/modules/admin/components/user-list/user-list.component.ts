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
  ngOnInit(): void {
    this.adminServ.getAllUsers().subscribe((res) => {
      this.success = res.success;
      if (this.success) {
        this.userData = res.user;
      } else {
        this.message = res.message;
      }
      console.log(res.user);
    });
  }

  deleteUser(userId: any) {
    this.adminServ.changeDeleteStatus(userId).subscribe((res) => {
      console.log(res.message);
    });
    // window.location.reload();
  }
}
