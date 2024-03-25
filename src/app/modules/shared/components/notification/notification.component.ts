import { Component, OnInit } from '@angular/core';
import { SharedServiceService } from '../../services/shared-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css'],
})
export class NotificationComponent implements OnInit {
  constructor(private sharedServ: SharedServiceService,private router:Router,private songSerivce: SharedServiceService) {}
  bandInvitation: any;
  newSongs: any;
  message: any;
  songLink:any;
  ngOnInit(): void {
    this.getNotification();
  }
  getNotification() {
    this.sharedServ.getNotification().subscribe({
      next: (res) => {
        console.log(res);
        this.bandInvitation = res.bandInvitation;
        this.newSongs = res.songs;
        this.message = res.message;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  acceptInvite(bandId: any) {
    this.sharedServ.acceptInvitation(bandId).subscribe({
      next: (res) => {
        console.log(res);
        localStorage.setItem('isInBand','true')
        this.getNotification();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  declineInvite(bandId: any) {
    this.sharedServ.declineInvitation(bandId).subscribe({
      next: (res) => {
        console.log(res);
        this.getNotification();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  userProfile(event: any, userId: any) {
    event.stopPropagation();
    this.router.navigate([`/user/user-profile/${userId}`]);
  }
  playSong(songUrl: any) {
    this.songLink = songUrl;
    this.songSerivce.setSongUrl(songUrl);
  }
}
