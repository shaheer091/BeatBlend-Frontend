import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BandService } from '../../services/band.service';

@Component({
  selector: 'app-band-profile',
  templateUrl: './band-profile.component.html',
  styleUrls: ['./band-profile.component.css'],
})
export class BandProfileComponent implements OnInit {
  bandProfileForm!: FormGroup;
  formData = new FormData();
  bandProfile: any;

  constructor(
    private formBuilder: FormBuilder,
    private bandServ: BandService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.bandGetProfile();
  }

  bandGetProfile() {
    this.bandServ.bandGetProfile().subscribe({
      next: (res) => {
        console.log(res);
        this.bandProfile = res[0];
        if (this.bandProfile) {
          this.bandProfileForm.patchValue({
            bandName: this.bandProfile?.bandName,
            bandBio: this.bandProfile?.bandBio,
            bandLocation: this.bandProfile?.bandLocation,
          });
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  initForm() {
    this.bandProfileForm = this.formBuilder.group({
      bandName: [''],
      bandBio: [''],
      bandLocation: [''],
      bandImage: [null],
    });
  }

  submitForm() {
    if (this.bandProfileForm.valid) {
      const value = this.bandProfileForm.value;
      this.formData.append('bandName', value.bandName);
      this.formData.append('bandBio', value.bandBio);
      this.formData.append('bandLocation', value.bandLocation);
      this.formData.append('bandImage', value.bandImage);
      this.bandServ.bandAddProfile(this.formData).subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (err) => {
          console.log(err);
        },
      });
      console.log('Form submitted');
      // console.log('Form value:', this.bandProfileForm.value);
    } else {
    }
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    this.bandProfileForm.patchValue({
      bandImage: file,
    });
  }
}
