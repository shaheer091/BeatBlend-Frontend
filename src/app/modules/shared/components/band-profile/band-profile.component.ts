import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-band-profile',
  templateUrl: './band-profile.component.html',
  styleUrls: ['./band-profile.component.css'],
})
export class BandProfileComponent implements OnInit {
  bandDetail:any;
  constructor(
    private route: ActivatedRoute,
    private commonServ: CommonService,
    private router:Router,
  ) {}
  bandId: any;
  ngOnInit(): void {
    this.route.params.subscribe({
      next: (params) => {
        this.bandId = params['id'];
      },
    });
    this.getBandDetails()
  }

  getBandDetails() {
    this.commonServ.getSingleBand(this.bandId).subscribe({
      next: (res) => {
        if(res){
          this.bandDetail=res;
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getUserProfile(userId:any){
    this.router.navigate([`/user/user-profile/${userId}`])
  }
}
