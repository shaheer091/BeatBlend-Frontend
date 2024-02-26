import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ArtistService } from '../../services/artist.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-artist-profile',
  templateUrl: './artist-profile.component.html',
  styleUrls: ['./artist-profile.component.css'],
})
export class ArtistProfileComponent implements OnInit {
  profileForm!: FormGroup;
  artistProfile: any;
  artistDetails: any;
  message: string = '';
  showSavingDiv: Boolean = false;

  constructor(
    private fb: FormBuilder,
    private artistServ: ArtistService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      username: [''],
      email: ['', Validators.email],
      bio: [''],
      phoneNumber: [''],
      dateOfBirth: [''],
      file: [''],
    });
    this.artistServ.artistGetProfile().subscribe((res) => {

      this.artistProfile = res.artistProfile[0].profile[0];
      this.artistDetails = res.user;
      this.profileForm.controls['username'].setValue(
        this.artistDetails.username || ''
      );
      this.profileForm.controls['email'].setValue(
        this.artistDetails.email || ''
      );
      this.profileForm.controls['bio'].setValue(
        this.artistProfile ? this.artistProfile.bio : ''
      );
      this.profileForm.controls['phoneNumber'].setValue(
        this.artistProfile ? this.artistProfile.phoneNumber : ''
      );
      this.profileForm.controls['dateOfBirth'].setValue(
        this.artistProfile ? this.artistProfile.dateOfBirth : ''
      );
      this.profileForm.controls['file'].setValue(
        this.artistProfile ? this.artistProfile.file : ''
      );
    });
  }

  onSubmit() {
    if (this.profileForm.valid) {
      this.artistServ
        .artistUpdateProfile(this.profileForm.value)
        .subscribe((res) => {
          this.showSavingDiv = true;
          setTimeout(() => {
            this.message = res.message;
          }, 2000);
          setTimeout(() => {
            if (res.success) {
              this.router.navigate(['/artist/home']);
              this.message = '';
            } else {
              this.showSavingDiv = false;
              this.message = '';
            }
          }, 3000);
        });
    } else {
    }
  }
}
