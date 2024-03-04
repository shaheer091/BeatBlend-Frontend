import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css'],
})
export class PlaylistComponent implements OnInit {
  constructor(private userServ: UserService,private router:Router) {}
  playlist:any;
  ngOnInit(): void {
    this.getPlaylist();
  }

  getPlaylist() {
    this.userServ.getPlaylist().subscribe({
      next: (res) => {
        this.playlist=res;
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  showPlaylist(playlistId:any){
    this.router.navigate(['/user/playlist',playlistId])
  }
}
