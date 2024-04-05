import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BandService } from '../../services/band.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-band-profile',
  templateUrl: './band-profile.component.html',
  styleUrls: ['./band-profile.component.css'],
})
export class BandProfileComponent implements OnInit {
  bandProfileForm!: FormGroup;
  formData = new FormData();
  bandProfile: any;
  showLoading:any;

  constructor(
    private formBuilder: FormBuilder,
    private bandServ: BandService,
    private router:Router
  ) {}

  ngOnInit(): void {
    this.showLoading=true;
    this.initForm();
    this.bandGetProfile();
  }

  bandGetProfile() {
    this.bandServ.bandGetProfile().subscribe({
      next: (res) => {
        this.showLoading=false;
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
        alert(err.error.message)

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
      this.showLoading=true;
      const value = this.bandProfileForm.value;
      this.formData.append('bandName', value.bandName);
      this.formData.append('bandBio', value.bandBio);
      this.formData.append('bandLocation', value.bandLocation);
      this.formData.append('bandImage', value.bandImage);
      this.bandServ.bandAddProfile(this.formData).subscribe({
        next: (res) => {
          this.showLoading=false;
        },
        error: (err) => {
        alert(err.error.message)

        },
      });
      this.router.navigate(['/band/home'])
    }
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    this.bandProfileForm.patchValue({
      bandImage: file,
    });
  }
}
