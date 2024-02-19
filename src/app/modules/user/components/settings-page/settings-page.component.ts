import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-settings-page',
  templateUrl: './settings-page.component.html',
  styleUrls: ['./settings-page.component.css'],
})
export class SettingsPageComponent {
  constructor(private userServ: UserService) {}
  showDiv: Boolean = false;
  socialMediaLink: string = '';
  message: string = '';

  showInput() {
    this.showDiv = true;
    console.log('btn clicked');
  }

  isValidLink(link: any) {
    const regex = /^(ftp|http|https):\/\/[^ "]+$/;
    return regex.test(link);
  }
  beAnArtist() {
    try {
      console.log('btn clicked');
      // const token = localStorage.getItem('token');
      if (this.socialMediaLink) {
        if (this.isValidLink(this.socialMediaLink)) {
          this.userServ
            .artistVerification(this.socialMediaLink)
            .subscribe((res) => {
              console.log(res);
            });
        }else{
          this.message='the provided link is not valid'
        }
      } else {
        this.message = 'enter your social media link';
      }
      setTimeout(() => {
        this.message=''
      }, 2000);
    } catch (err) {
      console.log('setting page', err);
    }
  }
}
