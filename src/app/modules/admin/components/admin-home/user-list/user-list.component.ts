import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../services/admin.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  constructor(private adminServ: AdminService) {}
  userData: any;
  ngOnInit(): void {
    this.adminServ.getAllUsers().subscribe((res) => {
      this.userData = res.user;
      console.log(this.userData);
    });
  }
}
