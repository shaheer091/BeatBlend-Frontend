import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
    private songSerivce: SharedServiceService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  songs: any[] = [];
  userId: any;
  username: string = '';
  message: string = '';
  songUrl: any = '';
  favBtn: any;
  songLink: any;
  artistDetails: any;
  showCommentDiv: Boolean = false;
  songId: any;

  getSong$ = new Subscription();
  favAndUnfav$ = new Subscription();
  likeUnlikeSong$ = new Subscription();
  showLoading: any;


  ngOnInit(): void {
    this.showLoading = true;

    this.getSong();
  }

  userProfile(event: any, userId: any) {
    event.stopPropagation();
    this.router.navigate([`/user/user-profile/${userId}`]);
  }

  getSong() {
    this.getSong$ = this.userServ.userGetSong().subscribe({
      next: (res) => {
        this.showLoading=false;
        this.userId = res.userId;
        this.artistDetails = res;
        this.username = res.username;
        if (res.songs) {
          this.songs = res?.songs?.map((song: any) => ({
            ...song,
            artistUsername: song?.artist[0]?.username,
            likedByUser: song?.likedBy?.includes(this.userId) || false,
            favorited: song?.favouritedBy?.includes(this.userId) || false,
          }));
        }
        this.message = res.message;
      },
      error: (err) => {
        alert(err.error.message);
      },
    });
  }

  favAndUnfav(event: any, song: any) {
    this.showLoading=true;
    event.stopPropagation();
    this.favAndUnfav$ = this.userServ.favAndUnfav(song._id).subscribe({
      next: (res) => {
        this.showLoading=false;
        this.getSong();
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

  likeSong(event: any, songId: any) {
    this.showLoading=true;
    event.stopPropagation();
    this.likeUnlikeSong$ = this.userServ.likeAndUnlikeSong(songId).subscribe({
      next: (res) => {
        this.showLoading=false;
        this.getSong();
      },
      error: (err) => {
        alert(err.error.message);
      },
    });
  }

  commentSong(event: any, songId: any) {
    event.stopPropagation();
    this.songId = songId;
    this.showCommentDiv = true;
  }
  handleCommentDivEvent(isVisible: Boolean) {
    this.showCommentDiv = isVisible;
  }

  ngOnDestroy(): void {
    this.getSong$?.unsubscribe();
    this.favAndUnfav$.unsubscribe();
    this.likeUnlikeSong$.unsubscribe();
  }
}
