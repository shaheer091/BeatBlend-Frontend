import { Component, OnDestroy, OnInit } from '@angular/core';
import { ArtistService } from '../../services/artist.service';
import { Router } from '@angular/router';
import { SharedServiceService } from 'src/app/modules/shared/services/shared-service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-artist-song-list',
  templateUrl: './artist-song-list.component.html',
  styleUrls: ['./artist-song-list.component.css'],
})
export class ArtistSongListComponent implements OnInit, OnDestroy {
  songs: any;
  idSong: any;
  message: any;
  username: any;
  success!: Boolean;
  showDeleteDiv: Boolean = false;
  showSongEditForm: Boolean = false;
  showLoading:any;

  getSong$ = new Subscription();
  deleteSong$ = new Subscription();

  constructor(
    private artistServ: ArtistService,
    private router: Router,
    private sharedServ: SharedServiceService
  ) {}
  ngOnInit(): void {
    this.showLoading=true;
    this.getSong();
  }
  getSong() {
    this.getSong$ = this.artistServ.artistGetSongs().subscribe({
      next: (res) => {
        this.showLoading=false;
        this.songs = res.songs;
        this.message = res.message;
        this.success = res.success;
        this.username = res.username;
      },
      error: (err) => {
        alert(err.error.message);
      },
    });
  }

  deleteSong() {
    try {
      this.showLoading=true;
      this.deleteSong$ = this.artistServ
        .artistDeleteSong(this.idSong)
        .subscribe({
          next: (res) => {
            this.showLoading=false;
            this.getSong();
          },
          error: (err) => {
            alert(err.error.message);
          },
        });
      this.showDeleteDiv = false;
    } catch (err) {
      alert(err);
    }
  }

  showDeleteConfirmation(event: any, songId: any) {
    event.stopPropagation();
    this.showDeleteDiv = true;
    this.idSong = songId;
  }

  editSong(event: any, songId: any) {
    event.stopPropagation();
    this.router.navigate(['/artist/editSong', songId]);
  }

  playSong(songUrl: any) {
    this.sharedServ.setSongUrl(songUrl);
  }
  ngOnDestroy(): void {
    this.getSong$?.unsubscribe();
    this.deleteSong$?.unsubscribe();
  }
}
