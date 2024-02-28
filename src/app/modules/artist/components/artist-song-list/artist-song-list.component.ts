import { Component, OnInit } from '@angular/core';
import { ArtistService } from '../../services/artist.service';
import { Router } from '@angular/router';
import { SharedServiceService } from 'src/app/modules/shared/services/shared-service.service';

@Component({
  selector: 'app-artist-song-list',
  templateUrl: './artist-song-list.component.html',
  styleUrls: ['./artist-song-list.component.css'],
})
export class ArtistSongListComponent implements OnInit {
  songs: any;
  idSong: any;
  message: any;
  username: any;
  success!: Boolean;
  showDeleteDiv: Boolean = false;
  showSongEditForm: Boolean = false;

  constructor(private artistServ: ArtistService, private router: Router,private sharedServ:SharedServiceService) {}
  ngOnInit(): void {
    this.getSong();
  }
  getSong() {
    this.artistServ.artistGetSongs().subscribe((res) => {
      this.songs = res.songs;
      this.message = res.message;
      this.success = res.success;
      this.username = res.username;
    });
  }

  deleteSong() {
    try {
      this.artistServ.artistDeleteSong(this.idSong).subscribe((res) => {
        console.log(res);
      });
      this.getSong();
      this.showDeleteDiv = false;
    } catch (err) {
      console.log(err);
    }
  }

  showDeleteConfirmation(event:any,songId: any) {
    event.stopPropagation()
    this.showDeleteDiv = true;
    this.idSong = songId;
  }

  editSong(event:any,songId: any) {
    event.stopPropagation()
    this.router.navigate(['/artist/editSong',songId])
  }

  playSong(songUrl:any){
    this.sharedServ.setSongUrl(songUrl)
  }
}
