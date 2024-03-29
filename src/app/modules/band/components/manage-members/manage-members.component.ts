import { Component, OnInit } from '@angular/core';
import { BandService } from '../../services/band.service';
import { Router } from '@angular/router';
import { ArtistService } from 'src/app/modules/artist/services/artist.service';
import { SharedServiceService } from 'src/app/modules/shared/services/shared-service.service';

@Component({
  selector: 'app-manage-members',
  templateUrl: './manage-members.component.html',
  styleUrls: ['./manage-members.component.css'],
})
export class ManageMembersComponent implements OnInit {
  bandDetails: any;
  addMember: Boolean = false;
  searchText!: any;
  artists: any;
  selectedArtists: any[] = [];
  role:any;
  constructor(
    private bandServ: BandService,
    private router: Router,
    private sharedServ: SharedServiceService
  ) {}
  ngOnInit(): void {
    this.getBandMembers();
  }
  getBandMembers() {
    this.bandServ.bandGetMembers().subscribe({
      next: (res) => {
        this.bandDetails = res.band[0];
      },
      error: (err) => {
        alert(err.error.message)
      },
    });
  }

  getUserProfile(userId: any) {
    this.router.navigate([`/band/user-profile/${userId}`]);
  }

  addMembers() {
    this.bandServ.addBandMember(this.selectedArtists).subscribe({
      next: (res) => {
      },
      error: (err) => {
        alert(err.error.message)
      },
    });
    this.addMember = false;
  }

  toggleSelection(artistId: any): void {
    const index = this.selectedArtists.indexOf(artistId);
    if (index === -1) {
      this.selectedArtists.push(artistId);
    } else {
      this.selectedArtists.splice(index, 1);
    }
  }

  onCancel() {
    this.addMember = false;
    this.selectedArtists = [];
  }

  searchArtist() {
    this.bandServ.searchArtist(this.searchText).subscribe({
      next: (res) => {
        this.artists = res.artists;
      },
      error: (err) => {
        alert(err.error.message)
      },
    });
  }

  removeMembers(userId: any) {
    this.bandServ.removeBandMember(userId).subscribe({
      next: (res) => {
        this.getBandMembers();
      },
      error: (err) => {
        alert(err.error.message)
      },
    });
  }
}
