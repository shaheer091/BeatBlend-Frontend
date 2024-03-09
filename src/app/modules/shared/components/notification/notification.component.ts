import { Component, OnInit } from '@angular/core';
import { SharedServiceService } from '../../services/shared-service.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css'],
})
export class NotificationComponent implements OnInit {
  constructor(private sharedServ: SharedServiceService) {}
  notifications: any;
  ngOnInit(): void {
    this.getNotification();
  }
  getNotification() {
    this.sharedServ.getNotification().subscribe({
      next: (res) => {
        console.log(res);
        this.notifications = res;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  acceptInvite(bandId:any) {
    this.sharedServ.acceptInvitation(bandId).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  declineInvite() {}
}
