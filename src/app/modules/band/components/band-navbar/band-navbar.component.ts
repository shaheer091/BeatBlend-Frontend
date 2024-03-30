import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedServiceService } from 'src/app/modules/shared/services/shared-service.service';
import { CommonService } from 'src/app/services/common.service';
import { SocketService } from 'src/app/services/socket.service';

@Component({
  selector: 'app-band-navbar',
  templateUrl: './band-navbar.component.html',
  styleUrls: ['./band-navbar.component.css'],
})
export class BandNavbarComponent{
  constructor(
    private router: Router,
    private commonServ: CommonService,
    private sharedServ: SharedServiceService,
    private chatServ:SocketService
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
    this.chatServ.socket.disconnect();
  }
}
