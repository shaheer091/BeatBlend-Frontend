import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { SharedServiceService } from 'src/app/modules/shared/services/shared-service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css'],
})
export class FavoritesComponent implements OnInit, OnDestroy {
  constructor(
    private userServ: UserService,
    private songSerivce: SharedServiceService
  ) {}
  songLink: string = '';
  favSongs: any;
  message: any;
  showLoading:any;

  getFavSongs$ = new Subscription();
  favAndUnfav$ = new Subscription();

  ngOnInit(): void {
    this.showLoading=true;
    this.getFavSong();
  }
  getFavSong() {
    this.getFavSongs$ = this.userServ.getFavSongs().subscribe({
      next: (res) => {
        this.showLoading=false;
        this.message = res.message;
        this.favSongs = res.favSongs;
      },
      error: (err) => {
        alert(err.error.error)
      },
    });
  }
  unFavSong(event: any, songId: any) {
    this.showLoading=true;
    event.stopPropagation();
    this.favAndUnfav$ = this.userServ.favAndUnfav(songId).subscribe({
      next: (res) => {
        this.showLoading=false;
        this.getFavSong();
      },
      error: (err) => {
        alert(err.error.message);
      },
    });
  }
  playSong(songUrl: any) {
    this.songLink = songUrl;
    this.songSerivce.setSongUrl(songUrl);
  }

  ngOnDestroy(): void {
    this.getFavSongs$?.unsubscribe();
    this.favAndUnfav$?.unsubscribe();
  }
}
