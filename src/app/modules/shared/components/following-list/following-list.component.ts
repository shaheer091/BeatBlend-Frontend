import { Component, OnInit } from '@angular/core';
import { SharedServiceService } from '../../services/shared-service.service';

@Component({
  selector: 'app-following-list',
  templateUrl: './following-list.component.html',
  styleUrls: ['./following-list.component.css'],
})
export class FollowingListComponent implements OnInit {
  constructor(private sharedServ: SharedServiceService) {}

  userList:any;
  ngOnInit(): void {
    this.getFollowingList();
  }
  
  getFollowingList() {
    this.sharedServ.getFollowingList().subscribe({
      next: (res) => {
        this.userList=res;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
