import { Component, OnDestroy, OnInit } from '@angular/core';
import { SharedServiceService } from '../../services/shared-service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-followers-list',
  templateUrl: './followers-list.component.html',
  styleUrls: ['./followers-list.component.css'],
})
export class FollowersListComponent implements OnInit,OnDestroy {
  constructor(private sharedServ: SharedServiceService) {}
  userList:any;
  followersList$=new Subscription()
  ngOnInit(): void {
    this.getFollowersList()
  }

  getFollowersList() {
    this.followersList$=this.sharedServ.getFollowersList().subscribe({
      next: (res) => {
        this.userList=res;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  ngOnDestroy(): void {
    this.followersList$.unsubscribe()
  }
}
