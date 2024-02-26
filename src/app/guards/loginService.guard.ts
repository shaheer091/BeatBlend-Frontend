import { Injectable } from '@angular/core';
import { CommonService } from '../services/common.service';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class LoginService implements CanActivate {
  constructor(private serv: CommonService, private router: Router) {}
  canActivate(): boolean {
    if (this.serv.isLoggedIn()) {
      const role = localStorage.getItem('role');
      this.router.navigate([`/${role}/home`]);
      return false;
    } else {
      return true;
    }
  }
}
