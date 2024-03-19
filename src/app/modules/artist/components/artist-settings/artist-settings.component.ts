import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-artist-settings',
  templateUrl: './artist-settings.component.html',
  styleUrls: ['./artist-settings.component.css'],
})
export class ArtistSettingsComponent implements OnInit {
  isInBand: any;
  hell: any;
  ngOnInit(): void {
    this.hell = localStorage.getItem('isInBand');
    if (this.hell == 'true') {
      this.isInBand = true;
    } else if (this.hell == 'false') {
      this.isInBand = false;
    }
  }
}
