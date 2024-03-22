import { Component, OnInit } from '@angular/core';
import { CommonService } from './services/common.service';
import { SharedServiceService } from './modules/shared/services/shared-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'frontend';
  showPlayer!: boolean;
  constructor(private commonServ: CommonService,private sharedServ:SharedServiceService) {}
  ngOnInit(): void {
    const decodedToken = this.sharedServ.parseJwt();
    this.commonServ.role=decodedToken.role;
    
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
