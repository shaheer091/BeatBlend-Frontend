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
  songs: any[] = [];

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

  addToPlaylist(songId: any) {
    this.userServ.addToPlaylist(songId).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  onSubmit() {
    // this.userServ.createPlaylist().subscribe({
    //   next: (res) => {
    //     console.log(res);
    //   },
    //   error: (err) => {
    //     console.log(err);
    //   },
    // });
  }
}
