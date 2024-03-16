import { Component, OnInit } from '@angular/core';
import { CommonService } from './services/common.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'frontend';
  showPlayer!: boolean;
  songLink:any;
  songTime:any;
  constructor(private commonServ: CommonService) {}
  ngOnInit(): void {

    this.commonServ.toggleToken$.subscribe({
      next:(val)=>{
        this.showPlayer=val
      },
      error:(err)=>{
        console.log(err);
      }
    })
    this.songLink=localStorage.getItem('songLink')
    this.songTime=localStorage.getItem('songTime')
    console.log(this.songLink,this.songTime);
  }
  
}
