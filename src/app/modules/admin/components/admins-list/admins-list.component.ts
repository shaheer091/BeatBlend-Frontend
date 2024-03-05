import { Component, OnDestroy, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admins-list',
  templateUrl: './admins-list.component.html',
  styleUrls: ['./admins-list.component.css'],
})
export class AdminsListComponent implements OnInit, OnDestroy {
  constructor(private adminServ: AdminService) {}
  adminData: any;
  message: any;
  success: any;

  getAdmins$ = new Subscription();

  ngOnInit(): void {
    this.getAdmins$ = this.adminServ.getAllAdmin().subscribe((res) => {
      this.success = res.success;
      if (this.success) {
        this.adminData = res.admin;
      } else {
        this.message = res.message;
      }
    });
  }
  ngOnDestroy(): void {
    this.getAdmins$?.unsubscribe();
  }
}
