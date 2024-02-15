import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';

@Injectable({
  providedIn: 'root',
})
export class AdminLoginGuard implements CanActivate {
  constructor(private serv: CommonService, private router: Router) {}
  canActivate(): boolean {
    if (this.serv.isLoggedIn() && this.serv.isAdmin()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
