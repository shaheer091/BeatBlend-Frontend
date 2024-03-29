import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ArtistService } from '../../services/artist.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-create-band',
  templateUrl: './create-band.component.html',
  styleUrls: ['./create-band.component.css'],
})
export class CreateBandComponent implements OnInit,OnDestroy {
  bandForm!: FormGroup;
  artists: any;
  selectedArtists: any[] = [];
  formData = new FormData();
  createBand$ = new Subscription()

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
        },
        error: (err) => {
          alert(err.error.message)
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
  }
  changing(event: any) {
    const files = event.target.files;
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
      this.createBand$=this.artistServ.createBand(this.formData).subscribe({
        next: (res) => {
          if(res.message){
            localStorage.setItem('isInBand','true')
            this.router.navigate(['/artist/home'])
          }
        },
        error: (err) => {
          alert(err.error.message)
        },
      });
    } else {
      alert('Enter the form details correctly');
    }
  }
  ngOnDestroy(): void {
    this.createBand$.unsubscribe()
  }
}
