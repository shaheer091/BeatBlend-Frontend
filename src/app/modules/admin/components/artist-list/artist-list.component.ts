import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../services/admin.service';

@Component({
  selector: 'app-artist-list',
  templateUrl: './artist-list.component.html',
  styleUrls: ['./artist-list.component.css'],
})
export class ArtistListComponent implements OnInit {
  constructor(private adminServ: AdminService) {}
  artistData: any;
  message: any;
  success: any;
  ngOnInit(): void {
    this.adminServ.getAllArtist().subscribe((res) => {
      console.log(res);
      this.success = res.success;
      if (res.success) {
        this.artistData = res.artist;
      } else {
        this.message = res.message;
      }
      console.log(this.message);
    });
  }
  deleteUser(userId: any) {
    this.adminServ.changeDeleteStatus(userId).subscribe((res) => {
      console.log(res.message);
    });
    // window.location.reload();
  }
}
