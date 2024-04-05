import { Component, OnDestroy, OnInit } from '@angular/core';
import { BandService } from '../../services/band.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-band-home',
  templateUrl: './band-home.component.html',
  styleUrls: ['./band-home.component.css'],
})
export class BandHomeComponent implements OnInit, OnDestroy {
  constructor(private bandServ: BandService) {}
  bandHome$ = new Subscription();
  bandDetails: any;
  isBandAdmin: any = Boolean(localStorage.getItem('isInBand'));
  showLoading:any;
  ngOnInit(): void {
    this.showLoading=true;
    this.getBandDetails();
  }
  getBandDetails() {
    this.bandHome$ = this.bandServ.bandGetHome().subscribe({
      next: (res) => {
        this.showLoading=false;
        this.bandDetails = res[0];
      },
      error: (err) => {
        alert(err.error.message)

      },
    });
  }
  
  
  ngOnDestroy(): void {
    this.bandHome$.unsubscribe();
  }
}
