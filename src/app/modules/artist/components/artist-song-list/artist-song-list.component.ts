import { Component, OnInit } from '@angular/core';
import { ArtistService } from '../../services/artist.service';

@Component({
  selector: 'app-artist-song-list',
  templateUrl: './artist-song-list.component.html',
  styleUrls: ['./artist-song-list.component.css'],
})
export class ArtistSongListComponent implements OnInit {
  songs:any;
  constructor(private artistServ:ArtistService){}
  ngOnInit(): void {
    this.artistServ.artistGetSongs().subscribe((res)=>{
      console.log(res);
      this.songs=res;
    })
  }
  deleteSong(songId:any){
    console.log('delete btn clicked')
    this.artistServ.artistDeleteSong(songId).subscribe((res)=>{
      console.log(res)
    })
  }
}
