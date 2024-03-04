import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-create-playlist',
  templateUrl: './create-playlist.component.html',
  styleUrls: ['./create-playlist.component.css'],
})
export class CreatePlaylistComponent {
  constructor(private userServ: UserService) {}
  searchText!: string;
  playlistName!: string;
  songs: any[] = [];
  songId: any[] = [];
  file: any;
  formData = new FormData();

  searchSong() {
    this.userServ.searchSong(this.searchText).subscribe({
      next: (res) => {
        console.log(res.songs);
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
    console.log(event.target.files);
    this.file = event.target.files[0];
  }

  addToPlaylist(songId: any) {
    this.songId.push(songId);
    console.log(this.songId);
  }

  onSubmit() {
    if (this.playlistName && this.songId.length > 0) {
      this.formData.append('playlistName', this.playlistName);
      this.formData.append('playlistImage', this.file);
      this.songId.forEach((id) => {
        this.formData.append('songIds[]', id);
      });
      this.userServ.createPlaylist(this.formData).subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (err) => {
          console.log(err);
        },
      });
    } else {
      console.error('Please provide playlist name and songs');
    }
  }
}
