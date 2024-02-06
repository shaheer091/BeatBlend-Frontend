import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  constructor(private router:Router){}

  showSide:Boolean=false;
  signup(){
    this.router.navigate(['signup'])
  }
  login(){
    this.router.navigate(['login'])
  }
  showSideBar(){
    this.showSide=!this.showSide;
    console.log('btn clicked');
  }
  
}
