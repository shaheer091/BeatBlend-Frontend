import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-band-profile',
  templateUrl: './band-profile.component.html',
  styleUrls: ['./band-profile.component.css'],
})
export class BandProfileComponent implements OnInit,OnDestroy {
  bandDetail:any;
  singleBand$= new Subscription()
  constructor(
    private route: ActivatedRoute,
    private commonServ: CommonService,
    private router:Router,
  ) {}
  bandId: any;
  showLoading: any;

  ngOnInit(): void {
    this.showLoading = true;

    this.route.params.subscribe({
      next: (params) => {
        this.bandId = params['id'];
        this.getBandDetails()
      },
    });
  }

  getBandDetails() {
    this.singleBand$=this.commonServ.getSingleBand(this.bandId).subscribe({
      next: (res) => {
        if(res){
          this.showLoading=false;
          this.bandDetail=res;
        }
      },
      error: (err) => {
        alert(err.error.message)

      },
    });
  }

  getUserProfile(userId:any){
    this.router.navigate([`/user/user-profile/${userId}`])
  }

  ngOnDestroy(): void {
    this.singleBand$.unsubscribe()
  }
}
