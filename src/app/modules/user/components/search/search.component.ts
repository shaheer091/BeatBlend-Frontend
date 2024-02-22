import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent {
  constructor(private userServ: UserService) {}
  searchText!: string;
  user: any[] = [];
  userId: any;
  following: any;

  search() {
    this.userServ.searchSong(this.searchText).subscribe((res) => {
      this.user = res.users;
      this.userId = res.userId;
      if (this.searchText !== '') {
        this.following = this.user.map((e) => e.followers.includes(this.userId));
      }
    });
  }
  followUser(userId: any) {
    this.userServ.followAndUnfollowUser(userId).subscribe((res) => {
    });
    this.search()
  }
}
