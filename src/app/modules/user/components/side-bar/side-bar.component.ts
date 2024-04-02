import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { SocketService } from 'src/app/services/socket.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css'],
})
export class SideBarComponent {
  constructor(private router: Router, private commonServ: CommonService,private chatServ:SocketService) {}
  showMore: Boolean = false;
  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
    this.commonServ.toggleToken$.next(false);
    this.chatServ.socket.disconnect();
  }

  navigation(title: any) {
    const path = title.toLowerCase();
    this.router.navigate([`/user/${path}`]);
  }

  mobileNavigation(title: any) {
    const path = title.toLowerCase();
    if (path != 'settings') {
      this.router.navigate([`/user/${path}`]);
    } else {
      this.showMore = !this.showMore;
    }
  }

  navBarItems = [
    {
      logo: '../../../../../assets/images/home.png',
      title: 'Home',
    },
    {
      logo: '../../../../../assets/images/magnifying-glass.png',
      title: 'Search',
    },
    {
      logo: '../../../../../assets/images/heart.png',
      title: 'Favorites',
    },
    {
      logo: '../../../../../assets/images/library.png',
      title: 'Playlist',
    },
    {
      logo: '../../../../../assets/images/bell.png',
      title: 'Notification',
    },
  ];

  mobileScreenNavBar = [
    {
      logo: '../../../../../assets/images/home.png',
      title: 'Home',
    },
    {
      logo: '../../../../../assets/images/magnifying-glass.png',
      title: 'Search',
    },
    {
      logo: '../../../../../assets/images/heart.png',
      title: 'Favorites',
    },
    {
      logo: '../../../../../assets/images/settings.png',
      title: 'Settings',
    },
  ];
}
