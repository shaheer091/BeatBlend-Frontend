import { Component, OnInit } from '@angular/core';
import { ArtistService } from '../../services/artist.service';

@Component({
  selector: 'app-artist-home',
  templateUrl: './artist-home.component.html',
  styleUrls: ['./artist-home.component.css'],
})
export class ArtistHomeComponent implements OnInit {
  constructor(
    private artistServ: ArtistService,
  ) {}
  artistDetails: any;
  ngOnInit(): void {
    this.getArtistHome();
  }
  getArtistHome() {
    this.artistServ.artistGetHome().subscribe({
      next: (res) => {
        this.artistDetails = res[0];
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
