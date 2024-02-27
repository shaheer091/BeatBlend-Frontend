import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-artist-list',
  templateUrl: './artist-list.component.html',
  styleUrls: ['./artist-list.component.css'],
})
export class ArtistListComponent implements OnInit {
  constructor(private adminServ: AdminService,private route:ActivatedRoute,private router:Router) {}
  artistData: any;
  message: any;
  success: any;
  deleteDiv: Boolean = false;
  artistId: any;
  ngOnInit(): void {
    this.getArtist();
  }
  getArtist() {
    this.adminServ.getAllArtist().subscribe((res) => {
      this.success = res.success;
      if (res.success) {
        this.artistData = res.artist;
      } else {
        this.message = res.message;
      }
    });
  }

  showDeleteDiv(artistId: any) {
    this.deleteDiv = true;
    this.artistId = artistId;
  }

  deleteUser() {
    this.adminServ.changeDeleteStatus(this.artistId).subscribe((res) => {
      this.deleteDiv=false;
      this.getArtist();
    });
    // window.location.reload();
  }
  getUserDetails(userId: any) {
    console.log(userId);
    const queryParams = {
      id: userId,
    };
    this.router.navigate(['/admin/user-profile'], {
      relativeTo: this.route,
      queryParams: queryParams,
    });
  }
}
