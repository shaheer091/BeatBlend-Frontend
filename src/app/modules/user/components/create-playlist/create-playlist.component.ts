import { Component, OnDestroy } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-create-playlist',
  templateUrl: './create-playlist.component.html',
  styleUrls: ['./create-playlist.component.css'],
})
export class CreatePlaylistComponent implements OnDestroy {
  constructor(private userServ: UserService, private router: Router) {}
  searchText!: string;
  playlistName!: string;
  songs: any[] = [];
  songId: any[] = [];
  file: any;
  formData = new FormData();

  searchSong$ = new Subscription();
  createPlaylist$ = new Subscription();

  searchSong() {
    this.searchSong$ = this.userServ.searchSong(this.searchText).subscribe({
      next: (res) => {
        if (res.songs) {
          this.songs = res.songs;
        } else {
          this.songs = [];
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  change(event: any) {
    this.file = event.target.files[0];
  }

  addToPlaylist(songId: any) {
    const index = this.songId.indexOf(songId);
    if (index === -1) {
      this.songId.push(songId);
    } else {
      this.songId.splice(index, 1);
    }
  }

  isSongInPlaylist(songId: any): boolean {
    return this.songId.includes(songId);
  }
  

  onSubmit() {
    if (this.playlistName && this.songId.length > 0) {
      this.formData.append('playlistName', this.playlistName);
      this.formData.append('playlistImage', this.file);
      this.songId.forEach((id) => {
        this.formData.append('songIds[]', id);
      });
      this.createPlaylist$ = this.userServ
        .createPlaylist(this.formData)
        .subscribe({
          next: (res) => {
            console.log(res);
            this.router.navigate(['/user/playlist']);
          },
          error: (err) => {
            console.log(err);
          },
        });
    } else {
      console.error('Please provide playlist name and songs');
    }
  }

  ngOnDestroy(): void {
    this.createPlaylist$?.unsubscribe();
    this.searchSong$?.unsubscribe();
  }
}
