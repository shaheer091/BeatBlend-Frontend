import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-single-playlist',
  templateUrl: './single-playlist.component.html',
  styleUrls: ['./single-playlist.component.css'],
})
export class SinglePlaylistComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userServ: UserService
  ) {}
  playlistId: any;
  songDetails:any;
  songs:any;
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.playlistId = params['id'];
    });
    this.getSinglePlaylist()
  }

  getSinglePlaylist() {
    this.userServ.getSinglePlaylist(this.playlistId).subscribe({
      next: (res) => {
        this.songDetails=res[0]
        this.songs=res[0].songs;
        console.log(this.songs);
        console.log(this.songDetails);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
