import { Component, OnInit } from '@angular/core';
import { BandService } from '../../services/band.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-members',
  templateUrl: './manage-members.component.html',
  styleUrls: ['./manage-members.component.css'],
})
export class ManageMembersComponent implements OnInit {
  bandDetails: any;
  constructor(private bandServ: BandService, private router: Router) {}
  ngOnInit(): void {
    this.getBandMembers();
  }
  getBandMembers() {
    this.bandServ.bandGetMembers().subscribe({
      next: (res) => {
        console.log(res);
        this.bandDetails = res.band[0];
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getUserProfille(userId: any) {
    this.router.navigate([`/band/user-profile/${userId}`]);
  }

  removeMembers(userId: any) {
    console.log(userId);
    this.bandServ.removeBandMember(userId).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
    this.getBandMembers();
  }
}
