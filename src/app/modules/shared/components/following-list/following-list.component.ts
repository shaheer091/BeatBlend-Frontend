import { Component, OnDestroy, OnInit } from '@angular/core';
import { SharedServiceService } from '../../services/shared-service.service';
import { UserService } from 'src/app/modules/user/services/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-following-list',
  templateUrl: './following-list.component.html',
  styleUrls: ['./following-list.component.css'],
})
export class FollowingListComponent implements OnInit,OnDestroy {
  constructor(private sharedServ: SharedServiceService,private userServ:UserService) {}

  userList:any;
  followingList$=new Subscription()
  unfollowUser$=new Subscription()
  ngOnInit(): void {
    this.getFollowingList();
  }
  
  getFollowingList() {
    this.followingList$=this.sharedServ.getFollowingList().subscribe({
      next: (res) => {
        this.userList=res;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  unfollowUser(userId:any){
    this.unfollowUser$=this.userServ.followAndUnfollowUser(userId).subscribe()
  }
  ngOnDestroy(): void {
    this.followingList$.unsubscribe()
    this.unfollowUser$.unsubscribe()
  }
}
