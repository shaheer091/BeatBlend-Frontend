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
  }
  
}
