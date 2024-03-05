import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css'],
})
export class PlaylistComponent implements OnInit, OnDestroy {
  constructor(private userServ: UserService, private router: Router) {}
  playlist: any;

  getPlaylist$ = new Subscription();
  ngOnInit(): void {
    this.getPlaylist();
  }

  getPlaylist() {
    this.getPlaylist$ = this.userServ.getPlaylist().subscribe({
      next: (res) => {
        this.playlist = res;
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  showPlaylist(playlistId: any) {
    this.router.navigate(['/user/playlist', playlistId]);
  }

  ngOnDestroy(): void {
    this.getPlaylist$?.unsubscribe();
  }
}
