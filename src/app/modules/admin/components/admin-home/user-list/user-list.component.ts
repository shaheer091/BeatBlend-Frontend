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
  activeUser:any;
  ngOnInit(): void {
    this.adminServ.getAllUsers().subscribe((res) => {
      this.userData = res.user;
      console.log(res.user);
      this.activeUser=this.userData.forEach((element:any) => {
        element.deleteStatus
      });
    });
  }

  deleteUser(userId:any){
    this.adminServ.deleteUser(userId).subscribe((res)=>{
      console.log(res);
    })
  }
  undeleteUser(userId:any){
    this.adminServ.unDeleteUser(userId).subscribe((res)=>{
      console.log(res);
    })
  }
}
