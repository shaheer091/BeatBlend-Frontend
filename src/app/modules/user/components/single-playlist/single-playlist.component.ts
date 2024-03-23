import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { SharedServiceService } from 'src/app/modules/shared/services/shared-service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-single-playlist',
  templateUrl: './single-playlist.component.html',
  styleUrls: ['./single-playlist.component.css'],
})
export class SinglePlaylistComponent implements OnInit, OnDestroy {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userServ: UserService,
    private sharedServ: SharedServiceService
  ) {}
  playlistId: any;
  playlistDetails: any;
  songs: any;
  songLink: any;
  singlePlaylist$ = new Subscription();
  removeFromPlaylist$ = new Subscription();
  deletePlaylist$ = new Subscription();
  favAndUnfav$ = new Subscription();

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.playlistId = params['id'];
    });
    this.getSinglePlaylist();
  }

  getSinglePlaylist() {
    this.singlePlaylist$ = this.userServ
      .getSinglePlaylist(this.playlistId)
      .subscribe({
        next: (res) => {
          this.playlistDetails = res?.playlist[0];
          if (res?.playlist[0]?.songs) {
            this.songs = res?.playlist[0]?.songs
          }
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  removeFromPlaylist(event: any, songId: any, playlistId:any) {
    event.stopPropagation();
    this.removeFromPlaylist$ = this.userServ
      .removeFromPlaylist(songId,playlistId)
      .subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (err) => {
          console.log(err);
        },
      });
    this.getSinglePlaylist();
  }

  deletePlaylist(playlistId: any) {
    this.deletePlaylist$ = this.userServ.deletePlaylist(playlistId).subscribe({
      next: (res) => {
        console.log(res);
        this.router.navigate(['/user/playlist']);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  playRandonSong() {
    const random = Math.floor(Math.random() * this.songs.length);
    this.songLink = this.songs[random].songUrl;
    this.sharedServ.setSongUrl(this.songLink);
  }

  playSong(songUrl: any) {
    this.sharedServ.setSongUrl(songUrl);
  }

  favSong(event: any, songId: any) {
    event.stopPropagation();
    this.favAndUnfav$ = this.userServ.favAndUnfav(songId).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  editPlaylist(playlistId: any) {
    this.router.navigate([`/user/editPlaylist/${playlistId}`]);
  }

  ngOnDestroy(): void {
    this.singlePlaylist$?.unsubscribe();
    this.removeFromPlaylist$?.unsubscribe();
    this.deletePlaylist$?.unsubscribe();
    this.favAndUnfav$?.unsubscribe();
  }
}
