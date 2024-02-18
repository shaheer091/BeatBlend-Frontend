import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../../../services/admin.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  constructor(private router: Router, private adminServ: AdminService) {}
  userData: any;
  artistData: any;
  pendingData: any;

  onLogout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  seeAllUsers() {
    this.router.navigate(['/admin/userList']);
  }

  seeAllArtist() {
    this.router.navigate(['/admin/artistList']);
  }

  seeAllPending() {
    this.router.navigate(['/admin/pendingUsersList']);
  }
  seeAllAdmin(){
    this.router.navigate(['/admin/adminList'])
  }
  goHome() {
    this.router.navigate(['/admin/home']);
  }
}
