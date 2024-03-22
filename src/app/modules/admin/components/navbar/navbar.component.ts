import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../../services/admin.service';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  constructor(
    private router: Router,
    private adminServ: AdminService,
    private commonServ: CommonService
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
  }
}
