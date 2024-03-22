import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedServiceService } from 'src/app/modules/shared/services/shared-service.service';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-band-navbar',
  templateUrl: './band-navbar.component.html',
  styleUrls: ['./band-navbar.component.css'],
})
export class BandNavbarComponent{
  constructor(
    private router: Router,
    private commonServ: CommonService,
    private sharedServ: SharedServiceService
  ) {}
  showSide: Boolean = false;
  showSideBar() {
    this.showSide = !this.showSide;
  }
  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
    this.showSide=false;
    this.commonServ.toggleToken$.next(false);
  }
}
