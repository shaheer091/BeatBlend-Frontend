import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../services/admin.service';

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
  approveUser(userId: any) {
    this.adminServ.pendingApproval(userId).subscribe((res) => {
      console.log(res.message);
    });
  }
}
