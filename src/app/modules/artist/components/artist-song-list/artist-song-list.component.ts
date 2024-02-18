import { Component, OnInit } from '@angular/core';
import { ArtistService } from '../../services/artist.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-artist-song-list',
  templateUrl: './artist-song-list.component.html',
  styleUrls: ['./artist-song-list.component.css'],
})
export class ArtistSongListComponent implements OnInit {
  songs: any;
  idSong: any;
  message: any;
  success!: Boolean;
  showDeleteDiv: Boolean = false;
  constructor(private artistServ: ArtistService, private router: Router) {}
  ngOnInit(): void {
    this.artistServ.artistGetSongs().subscribe((res) => {
      console.log(res);
      this.songs = res.songs;
      this.message = res.message;
      this.success = res.success;
    });
  }
  showDeleteConfirmation(songId: any) {
    this.showDeleteDiv = true;
    console.log(songId);
    this.idSong = songId;
  }
  deleteSong() {
    try {
      console.log('delete btn clicked');
      this.artistServ.artistDeleteSong(this.idSong).subscribe((res) => {
        console.log(res);
      });
      this.showDeleteDiv = false;
    } catch (err) {
      console.log(err);
    }
  }
}
