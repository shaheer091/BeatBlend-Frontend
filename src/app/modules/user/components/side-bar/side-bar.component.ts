import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent {
  constructor(private router:Router,private commonServ:CommonService){}
  logout(){
    localStorage.clear();
    this.router.navigate(['/login'])
    this.commonServ.toggleToken$.next(false)
  }
}
