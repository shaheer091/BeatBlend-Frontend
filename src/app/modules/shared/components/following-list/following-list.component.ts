import { Component, OnDestroy, OnInit } from '@angular/core';
import { SharedServiceService } from '../../services/shared-service.service';
import { UserService } from 'src/app/modules/user/services/user.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-following-list',
  templateUrl: './following-list.component.html',
  styleUrls: ['./following-list.component.css'],
})
export class FollowingListComponent implements OnInit,OnDestroy {
  constructor(private sharedServ: SharedServiceService,private userServ:UserService,private router:Router) {}

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
        console.log(this.userList);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  getUserProfile(userId: any) {
    this.router.navigate([`/user/user-profile/${userId}`]);
  }

  unfollowUser(userId:any){
    this.unfollowUser$=this.userServ.followAndUnfollowUser(userId).subscribe()
  }

  getSingleUser(userId:any){
    this.router.navigate([`/user/user-profile/${userId}`]);
  }
  ngOnDestroy(): void {
    this.followingList$.unsubscribe()
    this.unfollowUser$.unsubscribe()
  }
}
