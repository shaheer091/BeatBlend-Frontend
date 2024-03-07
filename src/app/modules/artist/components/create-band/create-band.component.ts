import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ArtistService } from '../../services/artist.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-band',
  templateUrl: './create-band.component.html',
  styleUrls: ['./create-band.component.css'],
})
export class CreateBandComponent implements OnInit {
  bandForm!: FormGroup;
  artists: any;
  selectedArtists: any[] = [];
  formData = new FormData();

  constructor(
    private formBuilder: FormBuilder,
    private artistServ: ArtistService,
    private router:Router
  ) {}

  ngOnInit(): void {
    this.bandForm = this.formBuilder.group({
      bandImage: [null, Validators.required],
      bandName: ['', Validators.required],
      newMember: ['', [Validators.required]],
    });
  }
  searchArtist() {
    const artistName = this.bandForm.value.newMember;
    if (artistName != '') {
      this.artistServ.searchArtist(artistName).subscribe({
        next: (res) => {
          this.artists = res.artists;
          console.log(this.artists);
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }

  toggleSelection(artistId: any): void {
    const index = this.selectedArtists.indexOf(artistId);
    if (index === -1) {
      this.selectedArtists.push(artistId);
    } else {
      this.selectedArtists.splice(index, 1);
    }
    console.log(this.selectedArtists);
  }
  changing(event: any) {
    const files = event.target.files;
    // if (files.length > 0) {
    //   this.bandForm.patchValue({
    //     file: files[0],
    //   });
    // }
    this.formData.append('bandImage',files[0])
  }

  onSubmit(): void {
    if (this.bandForm.valid) {
      const val = this.bandForm.value;
      // this.formData.append('bandImage', val.bandImage);
      this.formData.append('bandName', val.bandName);
      this.selectedArtists.forEach((artistId) => {
        this.formData.append('artistid[]', artistId);
      });
      this.artistServ.createBand(this.formData).subscribe({
        next: (res) => {
          console.log(res);
          if(res.message){
            this.router.navigate(['/artist/home'])
          }
        },
        error: (err) => {
          console.log(err);
        },
      });
    } else {
      console.error('Enter the form details correctly');
    }
  }
}
