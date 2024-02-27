import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { SharedServiceService } from 'src/app/modules/shared/services/shared-service.service';

@Component({
  selector: 'app-user-homepage',
  templateUrl: './user-homepage.component.html',
  styleUrls: ['./user-homepage.component.css'],
})
export class UserHomepageComponent implements OnInit {
  constructor(private userServ: UserService,private songSerivce:SharedServiceService) {}

  songs: any[] = [];
  username: string = '';
  message: string = '';
  songUrl: any = '';
  favBtn: any;
  songLink: any;

  ngOnInit(): void {
    this.getSong();
  }
  

  getSong() {
    this.userServ.userGetSong().subscribe((res) => {
      // console.log(res);
      this.username = res.username;
      this.songs = res.songs.map((song: any) => ({
        ...song,
        artistUsername: song.artist[0].username,
      }));
      // console.log(this.songs);
      this.message = res.message;
    });
  }

  favAndUnfav(event:any,song: any) {
    event.stopPropagation()
    this.userServ.favAndUnfav(song._id).subscribe((res) => {
      console.log(res);
      this.favBtn = res.fav;
      console.log(this.favBtn);
    });
    this.getSong();
  }

  playSong(songUrl: any) {
    this.songLink = songUrl;
      this.songSerivce.setSongUrl(songUrl);
  }
}
