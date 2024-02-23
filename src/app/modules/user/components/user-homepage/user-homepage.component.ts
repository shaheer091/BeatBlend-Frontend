import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-homepage',
  templateUrl: './user-homepage.component.html',
  styleUrls: ['./user-homepage.component.css']
})
export class UserHomepageComponent implements OnInit{
  constructor(private userServ:UserService){}
  songs:any[]=[]
  username:string=''
  message:string = ''
  favBtn:Boolean=false;
  ngOnInit(): void {
    this.getSong()
  }
  getSong(){
    this.userServ.userGetSong().subscribe((res)=>{
      console.log(res)
      this.username=res.username;
      this.songs=res.songs
      this.message=res.message;
    })
  }
  favAndUnfav(songId:any){
    this.userServ.favAndUnfav(songId).subscribe((res)=>{
      console.log(res)
    })
    this.getSong()
  }
}
 