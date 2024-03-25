import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { SharedServiceService } from '../../services/shared-service.service';
import { Subscription } from 'rxjs';

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
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private commonServ: CommonService,
    private sharedServ: SharedServiceService
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
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  playSong(songUrl: any) {
    this.sharedServ.setSongUrl(songUrl);
  }

  getBandDetails(bandId:any){
    this.router.navigate([`/user/band-profile/${bandId}`])
  }
  ngOnDestroy(): void {
    this.getSingleUser$?.unsubscribe();
  }

  sendMsg(userId: any) {
    this.router.navigate([`/user/chats/${userId}`]);
  }
}
