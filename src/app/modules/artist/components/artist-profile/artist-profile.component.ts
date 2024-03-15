import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ArtistService } from '../../services/artist.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-artist-profile',
  templateUrl: './artist-profile.component.html',
  styleUrls: ['./artist-profile.component.css'],
})
export class ArtistProfileComponent implements OnInit, OnDestroy {
  profileForm!: FormGroup;
  artistProfile: any;
  artistDetails: any;
  message: string = '';
  showSavingDiv: Boolean = false;

  getProfile$ = new Subscription();
  updateProfile$ = new Subscription();

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
    this.getProfile$ = this.artistServ.artistGetProfile().subscribe({
      next: (res) => {
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
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  onSubmit() {
    if (this.profileForm.valid) {
      this.updateProfile$ = this.artistServ
        .artistUpdateProfile(this.profileForm.value)
        .subscribe({
          next: (res) => {
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
          },
          error: (err) => {
            console.log(err);
          },
        });
    } else {
    }
  }
  ngOnDestroy(): void {
    this.getProfile$?.unsubscribe();
    this.updateProfile$?.unsubscribe();
  }
}
