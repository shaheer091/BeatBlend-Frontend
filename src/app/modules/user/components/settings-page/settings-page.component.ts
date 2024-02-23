import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-settings-page',
  templateUrl: './settings-page.component.html',
  styleUrls: ['./settings-page.component.css'],
})
export class SettingsPageComponent implements OnInit {
  constructor(private userServ: UserService) {}
  showDiv: Boolean = false;
  socialMediaLink: string = '';
  message: string = '';
  isArtist: Boolean = false;
  role: any;
  following: number = 0;
  followers: number = 0;
  image:any;
  imgBool:Boolean=false;

  ngOnInit(): void {
    this.role = localStorage.getItem('role');
    if (this.role == 'artist') this.isArtist = true;
    this.getSettingsPage();
  }

  showInput() {
    this.showDiv = true;
  }

  isValidLink(link: any) {
    const regex = /^(ftp|http|https):\/\/[^ "]+$/;
    return regex.test(link);
  }
  beAnArtist() {
    try {
      if (this.socialMediaLink) {
        if (this.isValidLink(this.socialMediaLink)) {
          this.userServ
            .artistVerification(this.socialMediaLink)
            .subscribe((res) => {});
        } else {
          this.message = 'the provided link is not valid';
        }
      } else {
        this.message = 'enter your social media link';
      }
      setTimeout(() => {
        this.message = '';
      }, 2000);
    } catch (err) {
      console.log('setting page', err);
    }
  }

  getSettingsPage() {
    this.userServ.getSettingsPage().subscribe((res) => {
      if(res.imageUrl){
        this.imgBool=true;
        this.image=res.imageUrl;
      }
      if (res.followers && res.followers.length > 0) {
        this.followers = res.followers.length;
      } else {
        this.followers = 0;
      }
      if (res.following && res.following.length > 0) {
        this.following = res.following.length;
      } else {
        this.following = 0;
      }
    });
  }
}
