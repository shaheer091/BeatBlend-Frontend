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
      console.log(res);
      this.user = res.users;
      this.userId = res.userId;
      // console.log(res.users[0].followers)
      if (this.searchText !== '') {
        this.following = this.user.map((e) => e.followers.includes(this.userId));
        console.log(this.following)
      }
      console.log();
    });
  }
  followUser(userId: any) {
    this.userServ.followUser(userId).subscribe((res) => {
      console.log(res);
      // this.following=res.following;
    });
    this.search()
  }
}
