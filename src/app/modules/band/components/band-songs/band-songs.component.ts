import { Component, OnInit } from '@angular/core';
import { BandService } from '../../services/band.service';
import { SharedServiceService } from 'src/app/modules/shared/services/shared-service.service';
import { Router } from '@angular/router';
import { ArtistService } from 'src/app/modules/artist/services/artist.service';

@Component({
  selector: 'app-band-songs',
  templateUrl: './band-songs.component.html',
  styleUrls: ['./band-songs.component.css'],
})
export class BandSongsComponent implements OnInit {
  songs: any;
  showDeleteDiv: Boolean = false;
  idSong: any;
  showLoading:any;
  constructor(
    private bandServ: BandService,
    private sharedServ: SharedServiceService,
    private router: Router,
    private artistServ:ArtistService
  
  ) {}

  ngOnInit(): void {
    this.showLoading=true;
    this.getBandSongs();
  }

  getBandSongs() {
    this.bandServ.getBandSongs().subscribe({
      next: (res) => {
        this.showLoading=false;
        this.songs = res;
      },
      error: (err) => {
        alert(err.error.message)

      },
    });
  }

  showDeleteConfirmation(event: any, songId: any) {
    event.stopPropagation();
    this.showDeleteDiv = true;
    this.idSong = songId;
  }

  playSong(songUrl: any) {
    this.sharedServ.setSongUrl(songUrl);
  }

  deleteSong() {
    this.showLoading=true;
    this.artistServ.artistDeleteSong(this.idSong).subscribe({
      next: (res) => {
        this.showLoading=false;
        this.getBandSongs();
        this.showDeleteDiv=false;
      },
      error: (err) => {
        alert(err.error.message)
      },
    });
  }

  editSong(event: any, songId: any) {
    event.stopPropagation();
    this.router.navigate([`/band/editSong/${songId}`]);
  }
}
