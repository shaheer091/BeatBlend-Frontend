import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';

@Injectable({
  providedIn: 'root',
})
export class BandLoginGuard implements CanActivate {
  constructor(private serv: CommonService, private router: Router) {}
  canActivate(): boolean {
    if (this.serv.isLoggedIn() && this.serv.isBand()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}