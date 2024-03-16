import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-settings-page',
  templateUrl: './settings-page.component.html',
  styleUrls: ['./settings-page.component.css'],
})
export class SettingsPageComponent implements OnInit, OnDestroy {
  data: any;

  constructor(private userServ: UserService, private router: Router,private commonServ:CommonService) {}
  showDiv: Boolean = false;
  socialMediaLink: string = '';
  message: string = '';
  isArtist: Boolean = false;
  role: any;
  following: number = 0;
  followers: number = 0;
  image: any;
  imgBool: Boolean = false;

  artistVerification$ = new Subscription();
  getSettings$ = new Subscription();

  ngOnInit(): void {
    this.role = this.commonServ.role;
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
          this.artistVerification$ = this.userServ
            .artistVerification(this.socialMediaLink)
            .subscribe();
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
    this.getSettings$ = this.userServ.getSettingsPage().subscribe({
      next: (res) => {
        if (res.imageUrl) {
          this.imgBool = true;
          this.image = res.imageUrl;
        }
        this.data = res;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  createBand() {
    this.router.navigate(['/user/createBand']);
  }

  ngOnDestroy(): void {
    this.artistVerification$?.unsubscribe();
    this.getSettings$?.unsubscribe();
  }
}
