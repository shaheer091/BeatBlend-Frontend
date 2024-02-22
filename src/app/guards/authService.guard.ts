import { Injectable } from '@angular/core';
import { CommonService } from '../services/common.service';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements CanActivate {
  constructor(private serv: CommonService, private router: Router) {}
  canActivate(): boolean {
    if (this.serv.isLoggedIn() && this.serv.isUser() || this.serv.isArtist()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
