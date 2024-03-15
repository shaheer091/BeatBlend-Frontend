import { Component, OnInit } from '@angular/core';
import { BandService } from '../../services/band.service';

@Component({
  selector: 'app-band-home',
  templateUrl: './band-home.component.html',
  styleUrls: ['./band-home.component.css'],
})
export class BandHomeComponent implements OnInit {
  constructor(private bandServ: BandService) {}
  bandDetails:any;
  isBandAdmin:any=Boolean(localStorage.getItem('isInBand'))
  ngOnInit(): void {
    this.getBandDetails()
    console.log(this.isBandAdmin);
  }
  getBandDetails() {
    this.bandServ.bandGetHome().subscribe({
      next: (res) => {
        this.bandDetails=res[0];
        console.log(this.bandDetails);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
