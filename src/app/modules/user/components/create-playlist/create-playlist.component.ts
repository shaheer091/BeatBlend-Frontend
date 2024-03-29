import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-create-playlist',
  templateUrl: './create-playlist.component.html',
  styleUrls: ['./create-playlist.component.css'],
})
export class CreatePlaylistComponent implements OnDestroy, OnInit {
  constructor(
    private userServ: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  searchText!: string;
  playlistName!: string;
  songs: any[] = [];
  songId: any[] = [];
  file: any;
  formData = new FormData();
  playlistId: any;
  playlistData: any;

  searchSong$ = new Subscription();
  createPlaylist$ = new Subscription();

  ngOnInit(): void {
    this.route.params.subscribe((id) => {
      this.playlistId = id['id'];
    });
    if (this.playlistId) {
      this.getPlaylistData();
    }
  }

  getPlaylistData() {
    this.userServ.getSinglePlaylistData(this.playlistId).subscribe({
      next: (res) => {
        this.playlistData = res[0];
        if (this.playlistData) {
          this.playlistName = this.playlistData.playlistName;
          this.songId = this.playlistData.songId;
        }
      },
      error: (err) => {
        alert(err.error.message);
      },
    });
  }
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
        alert(err.error.message);
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
                this.router.navigate(['/user/playlist']);
          },
          error: (err) => {
            alert(err.error.message);
          },
        });
    } else {
      console.error('Please provide playlist name and songs');
    }
  }

  onEditPlaylist() {
    this.formData.append('playlistName', this.playlistName);
    this.formData.append('playlistImage', this.file);
    this.songId.forEach((id) => {
      this.formData.append('songIds[]', id);
    });
    this.userServ.editPlaylist(this.playlistData._id, this.formData).subscribe({
      next: (res) => {
        this.router.navigate(['/user/playlist']);
      },
      error: (err) => {
        alert(err.error.message);
      },
    });
  }

  ngOnDestroy(): void {
    this.createPlaylist$?.unsubscribe();
    this.searchSong$?.unsubscribe();
  }
}
