import { Component, OnDestroy, OnInit } from '@angular/core';
import { ArtistService } from '../../services/artist.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-artist-home',
  templateUrl: './artist-home.component.html',
  styleUrls: ['./artist-home.component.css'],
})
export class ArtistHomeComponent implements OnInit, OnDestroy {
  constructor(private artistServ: ArtistService) {}
  artistDetails: any;
  artistHome$ = new Subscription();
  showLoading:any;
  ngOnInit(): void {
    this.showLoading=true;
    this.getArtistHome();
  }
  getArtistHome() {
    this.artistHome$ = this.artistServ.artistGetHome().subscribe({
      next: (res) => {
        this.showLoading=false;
        this.artistDetails = res[0];
      },
      error: (err) => {
        alert(err.error.message);
      },
    });
  }
  ngOnDestroy(): void {
    this.artistHome$.unsubscribe();
  }
}
