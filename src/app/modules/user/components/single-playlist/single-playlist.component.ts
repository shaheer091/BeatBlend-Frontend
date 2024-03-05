import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { CommonService } from 'src/app/services/common.service';
import { SharedServiceService } from 'src/app/modules/shared/services/shared-service.service';

@Component({
  selector: 'app-single-playlist',
  templateUrl: './single-playlist.component.html',
  styleUrls: ['./single-playlist.component.css'],
})
export class SinglePlaylistComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userServ: UserService,
    private sharedServ: SharedServiceService,
  ) {}
  playlistId: any;
  playlistDetails: any;
  songs: any;
  songLink:any;
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.playlistId = params['id'];
    });
    this.getSinglePlaylist();
  }

  getSinglePlaylist() {
    this.userServ.getSinglePlaylist(this.playlistId).subscribe({
      next: (res) => {
        this.playlistDetails = res[0];
        this.songs = res[0].songs;
        // console.log(this.songs);
        console.log(this.playlistDetails);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  removeFromPlaylist(songId: any) {
    console.log(songId);
    this.userServ.removeFromPlaylist(songId).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  deletePlaylist(playlistId: any) {
    console.log(playlistId);
    this.userServ.deletePlaylist(playlistId).subscribe({
      next: (res) => {
        console.log(res);
        this.router.navigate(['/user/playlist'])
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  playSong(){
    console.log(this.songs);
    const random = Math.floor(Math.random() * this.songs.length);
    this.songLink=this.songs[random].songUrl
    console.log(this.songLink);
    this.sharedServ.setSongUrl(this.songLink)
  }
}
