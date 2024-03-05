import { Component, OnInit } from '@angular/core';
import { SharedServiceService } from '../../services/shared-service.service';

@Component({
  selector: 'app-followers-list',
  templateUrl: './followers-list.component.html',
  styleUrls: ['./followers-list.component.css'],
})
export class FollowersListComponent implements OnInit {
  constructor(private sharedServ: SharedServiceService) {}
  userList:any;
  ngOnInit(): void {
    this.getFollowersList()
  }

  getFollowersList() {
    this.sharedServ.getFollowersList().subscribe({
      next: (res) => {
        console.log(res);
        this.userList=res;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
