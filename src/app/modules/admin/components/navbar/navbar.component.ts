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
  constructor(private router: Router, private adminServ: AdminService,private commonServ:CommonService) {}
  userData: any;
  artistData: any;
  pendingData: any;

  onLogout() {
    localStorage.clear();
    this.router.navigate(['/login']);
    this.commonServ.toggleToken$.next(false)
  }
}
