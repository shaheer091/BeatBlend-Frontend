import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-artist-nav-bar',
  templateUrl: './artist-nav-bar.component.html',
  styleUrls: ['./artist-nav-bar.component.css']
})
export class ArtistNavBarComponent {
  constructor (private router:Router){}
  logout(){
    localStorage.clear()
    this.router.navigate(['/login'])
  }
}
