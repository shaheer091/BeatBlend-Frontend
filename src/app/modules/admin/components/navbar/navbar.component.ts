import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../../services/admin.service';
import { CommonService } from 'src/app/services/common.service';
import { SocketService } from 'src/app/services/socket.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  constructor(
    private router: Router,
    private commonServ: CommonService,
    private chatServ:SocketService
  ) {}
  showSide: Boolean = false;
  showSideBar() {
    this.showSide = !this.showSide;
  }
  onLogout() {
    localStorage.clear();
    this.showSide = false;
    this.router.navigate(['/login']);
    this.commonServ.toggleToken$.next(false);
    this.chatServ.socket.disconnect();
  }
}
