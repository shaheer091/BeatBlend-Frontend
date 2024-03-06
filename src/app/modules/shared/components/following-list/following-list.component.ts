import { Component, OnInit } from '@angular/core';
import { SharedServiceService } from '../../services/shared-service.service';
import { UserService } from 'src/app/modules/user/services/user.service';

@Component({
  selector: 'app-following-list',
  templateUrl: './following-list.component.html',
  styleUrls: ['./following-list.component.css'],
})
export class FollowingListComponent implements OnInit {
  constructor(private sharedServ: SharedServiceService,private userServ:UserService) {}

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

  unfollowUser(userId:any){
    this.userServ.followAndUnfollowUser(userId).subscribe()
  }
}
