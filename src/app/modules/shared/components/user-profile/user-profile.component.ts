import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { SharedServiceService } from '../../services/shared-service.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  id: any;
  userData: any;
  userSongs:any;
  constructor(
    private route: ActivatedRoute,
    private commonServ: CommonService,
    private sharedServ: SharedServiceService
  ) {}
  ngOnInit(): void {
    this.route.queryParams.subscribe((res) => {
      this.id = res['id'];
      console.log(this.id);
    });
    this.getUserProfile();
  }
  getUserProfile() {
    this.commonServ.getSingleUser(this.id).subscribe((res) => {
      console.log(res[0].profile);
      this.userData = res;
      this.userSongs=res[0].songs;
      console.log(this.userData);
    });
  }
  playSong(songUrl:any){
    this.sharedServ.setSongUrl(songUrl)
  }
}
