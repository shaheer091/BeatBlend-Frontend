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
  username: any;
  success!: Boolean;
  showDeleteDiv: Boolean = false;
  constructor(private artistServ: ArtistService, private router: Router) {}
  ngOnInit(): void {
    this.getSong();
  }
  getSong() {
    this.artistServ.artistGetSongs().subscribe((res) => {
      this.songs = res.songs;
      this.message = res.message;
      this.success = res.success;
      this.username = res.username;
    });
  }

  deleteSong() {
    try {
      this.artistServ.artistDeleteSong(this.idSong).subscribe((res) => {
        console.log(res);
      });
      this.getSong();
      this.showDeleteDiv = false;
    } catch (err) {
      console.log(err);
    }
  }

  showDeleteConfirmation(songId: any) {
    this.showDeleteDiv = true;
    this.idSong = songId;
  }

  editSong() {}
}
