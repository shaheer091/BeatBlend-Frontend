import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-artist-home',
  templateUrl: './artist-home.component.html',
  styleUrls: ['./artist-home.component.css']
})
export class ArtistHomeComponent {
  constructor (private router:Router){}
  logout(){
    localStorage.clear()
    this.router.navigate(['/login'])
  }
}
