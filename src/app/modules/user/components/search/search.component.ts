import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { CommonService } from 'src/app/services/common.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent {
  constructor(
    private userServ: UserService,
    private commonServ: CommonService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  searchText!: string;
  user: any[] = [];
  userId: any;
  following: any;

  search() {
    this.userServ.searchSong(this.searchText).subscribe(
      (res) => {
        this.user = res.users;
        this.userId = res.userId;
        if (this.searchText !== '') {
          this.following = this.user.map((e) =>
            e.followers.includes(this.userId)
          );
          console.log(this.following);
        }
      },
      (err) => {
        console.log(err);
        if (err.status === 404) {
          this.user = err.users;
        }
      }
    );
  }
  followUser(userId: any) {
    this.userServ.followAndUnfollowUser(userId).subscribe((res) => {});
    this.search();
  }
  userProfile(userId: any) {
    console.log(userId);
    const queryParams = {
      id: userId,
    };
    this.router.navigate(['/user/user-profile'], {
      relativeTo: this.route,
      queryParams: queryParams,
    });
  }
}
