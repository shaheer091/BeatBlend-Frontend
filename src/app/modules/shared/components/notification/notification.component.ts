import { Component, OnInit } from '@angular/core';
import { SharedServiceService } from '../../services/shared-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css'],
})
export class NotificationComponent implements OnInit {
  constructor(
    private sharedServ: SharedServiceService,
    private router: Router,
    private songSerivce: SharedServiceService
  ) {}
  bandInvitation: any;
  newSongs: any;
  message: any;
  songLink: any;
  ngOnInit(): void {
    this.getNotification();
  }
  getNotification() {
    this.sharedServ.getNotification().subscribe({
      next: (res) => {
        this.bandInvitation = res.bandInvitation;
        this.newSongs = res.songs;
        this.message = res.message;
      },
      error: (err) => {
        alert(err.error.message);
      },
    });
  }

  acceptInvite(bandId: any) {
    this.sharedServ.acceptInvitation(bandId).subscribe({
      next: (res) => {
        localStorage.setItem('isInBand', 'true');
        this.getNotification();
      },
      error: (err) => {
        alert(err.error.message);
      },
    });
  }

  declineInvite(bandId: any) {
    this.sharedServ.declineInvitation(bandId).subscribe({
      next: (res) => {
        this.getNotification();
      },
      error: (err) => {
        alert(err.error.message);
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
