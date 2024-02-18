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

  showInput() {
    this.showDiv = true;
    console.log('btn clicked');
  }
  onCancel() {
    this.showDiv = false;
  }
  beAnArtist() {
    try {
      console.log('btn clicked');
      // const token = localStorage.getItem('token');
      this.userServ.artistVerification(this.socialMediaLink).subscribe((res)=>{
        console.log(res);
      })
    } catch (err) {
      console.log('setting page', err);
    }
  }
}
