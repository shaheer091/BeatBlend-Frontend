import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { SharedServiceService } from '../../services/shared-service.service';
import { Subscription } from 'rxjs';
import { AdminService } from 'src/app/modules/admin/services/admin.service';
import { UserService } from 'src/app/modules/user/services/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit, OnDestroy {
  id: any;
  userData: any;
  userSongs: any;
  role = this.commonServ.role;
  userId = this.sharedServ.parseJwt();
  followers:any;
  isFollowing:any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private commonServ: CommonService,
    private sharedServ: SharedServiceService,
    private adminServ: AdminService,
    private userServ: UserService,
  ) {}

  getSingleUser$ = new Subscription();
  ngOnInit(): void {
    this.route.params.subscribe({
      next: (res) => {
        this.id = res['id'];
        this.getUserProfile();
      },
    });
  }
  getUserProfile() {
    this.getSingleUser$ = this.commonServ.getSingleUser(this.id).subscribe({
      next: (res) => {
        this.userData = res;
        this.userSongs = res[0]?.songs;
        this.followers=this.userData[0].followers;
        this.isFollowing = this.followers.some((e: any) => {
          return e == this.userId.userId;
        });
      },
      error: (err) => {
        alert(err.error.message);
      },
    });
  }
  playSong(songUrl: any) {
    this.sharedServ.setSongUrl(songUrl);
  }
  blockUnblockSong(event:any,songId: any) {
    event.stopPropagation()
    this.adminServ.changeSongBlockStatus(songId).subscribe({
      next: (res) => {
        console.log(res);
        this.getUserProfile()
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  followUnfollowUser(userId:any){
    this.userServ
      .followAndUnfollowUser(userId)
      .subscribe({
        next: (res) => {
          this.getUserProfile()
        },
        error: (err) => {
          alert(err.error.message);
        },
      });
  }

  getBandDetails(bandId: any) {
    this.router.navigate([`/user/band-profile/${bandId}`]);
  }
  ngOnDestroy(): void {
    this.getSingleUser$?.unsubscribe();
  }

  sendMsg(userId: any) {
    this.router.navigate([`/user/chats/${userId}`]);
  }
}
