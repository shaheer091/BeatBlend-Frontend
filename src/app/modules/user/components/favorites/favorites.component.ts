import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { SharedServiceService } from 'src/app/modules/shared/services/shared-service.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit{
  constructor (private userServ:UserService,private songSerivce:SharedServiceService){}
  songLink:string=''
  favSongs:any;
  message:any;
  ngOnInit(): void {
      this.getFavSong()
  }
  getFavSong(){
    this.userServ.getFavSongs().subscribe((res)=>{
      console.log(res);
      this.message=res.message;
      this.favSongs=res.favSongs;
    })
  }
  unFavSong(event:any,songId:any){
    event.stopPropagation();
    this.userServ.favAndUnfav(songId).subscribe((res)=>{
      console.log(res);
    })
    this.getFavSong()
  }
  playSong(songUrl: any) {
    this.songLink = songUrl;
      this.songSerivce.setSongUrl(songUrl);
  }
}
