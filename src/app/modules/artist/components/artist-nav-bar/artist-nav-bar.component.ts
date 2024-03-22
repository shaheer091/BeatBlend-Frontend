import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-artist-nav-bar',
  templateUrl: './artist-nav-bar.component.html',
  styleUrls: ['./artist-nav-bar.component.css'],
})
export class ArtistNavBarComponent {
  constructor(private router: Router, private commonServ: CommonService) {}
  showSide: Boolean = false;
  showSideBar() {
    this.showSide = !this.showSide;
  }
  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
    this.commonServ.toggleToken$.next(false);
  }
}
