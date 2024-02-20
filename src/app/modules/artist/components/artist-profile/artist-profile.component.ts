import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ArtistService } from '../../services/artist.service';

@Component({
  selector: 'app-artist-profile',
  templateUrl: './artist-profile.component.html',
  styleUrls: ['./artist-profile.component.css'],
})
export class ArtistProfileComponent implements OnInit {
  profileForm!: FormGroup;
  artistProfile: any;
  artistDetails: any;

  constructor(private fb: FormBuilder, private artistServ: ArtistService) {}

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
      // console.log(res.user);
      console.log(res.artistProfile[0]);
      this.artistProfile = res.artistProfile[0].profile[0];
      // console.log(this.artistProfile)
      this.artistDetails = res.user;
      this.profileForm.controls['username'].setValue(
        this.artistDetails.username || ''
      );
      this.profileForm.controls['email'].setValue(
        this.artistDetails.email || ''
      );
      this.profileForm.controls['bio'].setValue(this.artistProfile.bio || '');
      this.profileForm.controls['phoneNumber'].setValue(
        this.artistProfile.phoneNumber || ''
      );
      this.profileForm.controls['dateOfBirth'].setValue(
        this.artistProfile.dateOfBirth || ''
      );
      // this.profileForm.controls['file'].setValue(this.artistProfile.file || '');
    });
  }

  onSubmit() {
    if (this.profileForm.valid) {
      console.log(this.profileForm.value);
      this.artistServ
        .artistUpdateProfile(this.profileForm.value)
        .subscribe((res) => {
          console.log(res);
        });
    } else {
      console.log('Form is invalid');
    }
  }
}
