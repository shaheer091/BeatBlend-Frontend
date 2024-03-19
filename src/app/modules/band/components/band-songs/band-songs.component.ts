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
  constructor(
    private bandServ: BandService,
    private sharedServ: SharedServiceService,
    private router: Router,
    private artistServ:ArtistService
  
  ) {}

  ngOnInit(): void {
    this.getBandSongs();
  }

  getBandSongs() {
    this.bandServ.getBandSongs().subscribe({
      next: (res) => {
        this.songs = res;
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  showDeleteConfirmation(event: any, songId: any) {
    console.log(songId);
    event.stopPropagation();
    this.showDeleteDiv = true;
    this.idSong = songId;
  }

  playSong(songUrl: any) {
    this.sharedServ.setSongUrl(songUrl);
  }

  deleteSong() {
    this.artistServ.artistDeleteSong(this.idSong).subscribe({
      next: (res) => {
        console.log(res);
        this.getBandSongs();
        this.showDeleteDiv=false;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  editSong(event: any, songId: any) {
    event.stopPropagation();
    this.router.navigate([`/band/editSong/${songId}`]);
  }
}
