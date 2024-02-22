import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-settings-page',
  templateUrl: './settings-page.component.html',
  styleUrls: ['./settings-page.component.css'],
})
export class SettingsPageComponent implements OnInit{
  constructor(private userServ: UserService) {}
  showDiv: Boolean = false;
  socialMediaLink: string = '';
  message: string = '';
  isArtist:Boolean=false;
  role:any;
  ngOnInit(): void {
    this.role=localStorage.getItem('role')
    console.log(this.role)
    if(this.role=='artist'){
      this.isArtist=true;
    }
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
      // const token = localStorage.getItem('token');
      if (this.socialMediaLink) {
        if (this.isValidLink(this.socialMediaLink)) {
          this.userServ
            .artistVerification(this.socialMediaLink)
            .subscribe((res) => {
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
