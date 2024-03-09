import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { SharedServiceService } from 'src/app/modules/shared/services/shared-service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-homepage',
  templateUrl: './user-homepage.component.html',
  styleUrls: ['./user-homepage.component.css'],
})
export class UserHomepageComponent implements OnInit, OnDestroy {
  constructor(
    private userServ: UserService,
    private songSerivce: SharedServiceService
  ) {}

  songs: any[] = [];
  username: string = '';
  message: string = '';
  songUrl: any = '';
  favBtn: any;
  songLink: any;
  artistDetails:any;

  getSong$ = new Subscription();
  favAndUnfav$ = new Subscription();

  ngOnInit(): void {
    this.getSong();
  }

  getSong() {
    this.getSong$ = this.userServ.userGetSong().subscribe({
      next: (res) => {
        console.log(res);
        this.artistDetails=res
        this.username = res.username;
        this.songs = res.songs?.map((song: any) => ({
          ...song,
          artistUsername: song.artist[0].username,
        }));
        this.message = res.message;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  favAndUnfav(event: any, song: any) {
    event.stopPropagation();
    this.favAndUnfav$ = this.userServ.favAndUnfav(song._id).subscribe({
      next: (res) => {
        this.favBtn = res.fav;
      },
      error: (err) => {
        console.log(err);
      },
    });
    this.getSong();
  }

  playSong(songUrl: any) {
    this.songLink = songUrl;
    this.songSerivce.setSongUrl(songUrl);
  }

  ngOnDestroy(): void {
    this.getSong$?.unsubscribe();
    this.favAndUnfav$.unsubscribe();
  }
}
