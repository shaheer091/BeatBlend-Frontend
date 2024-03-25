import { Component, OnDestroy } from '@angular/core';
import { UserService } from '../../services/user.service';
import { CommonService } from 'src/app/services/common.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnDestroy {
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
  message: any;

  searchUser$ = new Subscription();
  followAndUnfollow$ = new Subscription();

  search() {
    this.searchUser$ = this.userServ.searchUser(this.searchText).subscribe({
      next: (res) => {
        this.user = res.users;
        this.userId = res.userId;
        this.message = res.message;
        if (this.searchText !== '') {
          this.following = this.user.map((e) =>
            e.followers.includes(this.userId)
          );
        }
      },
      error: (err) => {
        console.log(err);
        if (err.status === 404) {
          this.user = err.users;
        }
      },
    });
  }
  followUser(event: any, userId: any) {
    event.stopPropagation();
    this.followAndUnfollow$ = this.userServ
      .followAndUnfollowUser(userId)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.search();
        },
        error: (err) => {
          console.log(err);
        },
      });
    
  }
  userProfile(userId: any) {
    this.router.navigate([`/user/user-profile/${userId}`]);
  }

  ngOnDestroy(): void {
    this.searchUser$?.unsubscribe();
    this.followAndUnfollow$?.unsubscribe();
  }
}
