import { Component, OnInit } from '@angular/core';
import { SharedServiceService } from '../../services/shared-service.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css'],
})
export class NotificationComponent implements OnInit {
  constructor(private sharedServ: SharedServiceService) {}
  bandInvitation: any;
  newSongs: any;
  message: any;
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
      },
      error: (err) => {
        console.log(err);
      },
    });
    this.getNotification();
  }

  declineInvite(bandId: any) {
    this.sharedServ.declineInvitation(bandId).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
    this.getNotification();
  }
}
