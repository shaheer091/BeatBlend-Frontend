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
  ngOnInit(): void {
    this.adminServ.getAllPending().subscribe((res) => {
      console.log(res.pending);
      this.pendingData = res.pending;
    });
  }
  approveUser(userId:any){
    this.adminServ.pendingApproval(userId).subscribe((res)=>{
      console.log(res.message);
    })
  }
}
