import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-band-navbar',
  templateUrl: './band-navbar.component.html',
  styleUrls: ['./band-navbar.component.css']
})
export class BandNavbarComponent {
  constructor(private router:Router,private commonServ:CommonService){}
  logout(){
    localStorage.clear()
    this.router.navigate(['/login'])
    this.commonServ.toggleToken$.next(false)
  }
}
