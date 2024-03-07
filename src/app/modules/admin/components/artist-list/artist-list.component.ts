import { Component, OnDestroy, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-artist-list',
  templateUrl: './artist-list.component.html',
  styleUrls: ['./artist-list.component.css'],
})
export class ArtistListComponent implements OnInit, OnDestroy {
  constructor(
    private adminServ: AdminService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  artistData: any;
  message: any;
  success: any;
  deleteDiv: Boolean = false;
  artistId: any;

  getArtist$ = new Subscription();
  changeDeleteStatus$ = new Subscription();

  ngOnInit(): void {
    this.getArtist();
  }
  getArtist() {
    this.getArtist$ = this.adminServ.getAllArtist().subscribe({
      next: (res) => {
        this.success = res.success;
        if (res.success) {
          this.artistData = res.artist;
        } else {
          this.message = res.message;
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  showDeleteDiv(event:any,artistId: any) {
    event.stopPropagation()
    this.deleteDiv = true;
    this.artistId = artistId;
  }

  deleteUser() {
    this.changeDeleteStatus$ = this.adminServ
      .changeDeleteStatus(this.artistId)
      .subscribe({
        next: (res) => {
          this.deleteDiv = false;
          this.getArtist();
        },
        error: (err) => {
          console.log(err);
        },
      });
    // window.location.reload();
  }
  getUserDetails(userId: any) {
    const queryParams = {
      id: userId,
    };
    this.router.navigate(['/admin/user-profile'], {
      relativeTo: this.route,
      queryParams: queryParams,
    });
  }
  ngOnDestroy(): void {
    this.changeDeleteStatus$?.unsubscribe();
    this.getArtist$?.unsubscribe();
  }
}
