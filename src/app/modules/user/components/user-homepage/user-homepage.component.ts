import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-homepage',
  templateUrl: './user-homepage.component.html',
  styleUrls: ['./user-homepage.component.css'],
})
export class UserHomepageComponent implements OnInit {
  constructor(private userServ: UserService) {}

  
  songs: any[] = [];
  username: string = '';
  message: string = '';
  songUrl: any = '';
  favBtn: Boolean = false;


  ngOnInit(): void {
    this.getSong();
  }


  getSong() {
    this.userServ.userGetSong().subscribe((res) => {
      console.log(res);
      this.username = res.username;
      this.songs = res.songs.map((song: any) => ({
        ...song,
        favBtn: false,
        artistUsername: song.artist[0].username,
      }));
      this.message = res.message;
    });
  }


  favAndUnfav(song: any) {
    this.userServ.favAndUnfav(song._id).subscribe((res) => {
      console.log(res);
      song.favBtn = !song.favBtn;
    });
    this.getSong();
  }

}
