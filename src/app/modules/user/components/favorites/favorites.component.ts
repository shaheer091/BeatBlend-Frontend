import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit{
  constructor (private userServ:UserService){}
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
  unFavSong(songId:any){
    this.userServ.favAndUnfav(songId).subscribe((res)=>{
      console.log(res);
    })
    this.getFavSong()
  }
}
