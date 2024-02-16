import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../services/admin.service';

@Component({
  selector: 'app-admins-list',
  templateUrl: './admins-list.component.html',
  styleUrls: ['./admins-list.component.css']
})
export class AdminsListComponent implements OnInit{
  constructor(private adminServ:AdminService){}
  adminData:any;

ngOnInit(): void {
  this.adminServ.getAllAdmin().subscribe((res)=>{
    console.log(res.admin);
    this.adminData=res.admin
  })  
}
}
