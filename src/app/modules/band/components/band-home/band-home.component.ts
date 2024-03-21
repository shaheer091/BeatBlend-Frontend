import { Component, OnDestroy, OnInit } from '@angular/core';
import { BandService } from '../../services/band.service';
import { Subscription } from 'rxjs';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-band-home',
  templateUrl: './band-home.component.html',
  styleUrls: ['./band-home.component.css'],
})
export class BandHomeComponent implements OnInit, OnDestroy {
  constructor(private bandServ: BandService) {}
  public chart: any;
  bandHome$ = new Subscription();
  bandDetails: any;
  isBandAdmin: any = Boolean(localStorage.getItem('isInBand'));
  ngOnInit(): void {
    this.getBandDetails();
    console.log(this.isBandAdmin);
    this.renderChart();
  }
  getBandDetails() {
    this.bandHome$ = this.bandServ.bandGetHome().subscribe({
      next: (res) => {
        this.bandDetails = res[0];
        console.log(this.bandDetails);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  
  renderChart(): void {
    const data = [20000, 14000, 12000, 15000, 18000, 19000, 22000];
    const labels = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    const ctx = document.getElementById('myChart') as HTMLCanvasElement;
    const myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'This week',
          data: data,
        }]
      },
    });
  }
  ngOnDestroy(): void {
    this.bandHome$.unsubscribe();
  }
}
