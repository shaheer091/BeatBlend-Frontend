import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  myForm!: FormGroup;
  userData: any;
  userDetails: any;
  showOtp: Boolean = false;
  otp: any;
  otpMessage: any;
  arr: File[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private userServ: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.myForm = this.formBuilder.group({
      file: [''],
      bio: [''],
      username: [''],
      email: [''],
      phoneNumber: [''],
      date: [''],
      gender: [''],
    });

    this.userServ.getUserProfile().subscribe((res) => {
      this.userData = res.userProfile[0];
      this.userDetails = res.userProfile[0].userDetails[0];
      this.myForm.controls['username']?.patchValue(
        this.userData.username || ''
      );
      this.myForm.controls['email']?.patchValue(this.userData.email || '');
      this.myForm.controls['bio']?.patchValue(this.userDetails.bio || '');
      this.myForm.controls['phoneNumber']?.patchValue(
        this.userDetails.phoneNumber || ''
      );
      this.myForm.controls['date']?.patchValue(
        this.userDetails.dateOfBirth || ''
      );
      this.myForm.controls['gender']?.patchValue(this.userDetails.gender || '');
    });
  }

  changing(event: any) {
    const files = event.target.files;
    if (files.length > 0) {
      this.myForm.patchValue({
        file: files[0],
      });
    }
    console.log(files);
  }

  message: string = '';
  onSubmit(): void {
    if (this.myForm.valid) {
      const formdata = new FormData();
      const value = this.myForm.value;
      formdata.append('bio', value.bio);
      formdata.append('username', value.username);
      formdata.append('email', value.email);
      formdata.append('phoneNumber', value.phoneNumber);
      formdata.append('date', value.date);
      formdata.append('gender', value.gender);
      formdata.append('file', value.file);

      console.log('sudais');

      this.userServ.updateProfile(formdata).subscribe(
        (res) => {
          setTimeout(() => {
            this.message = res.message;
          }, 1000);
          this.message = 'please wait saving the changes ...';
        },
        (error) => {
          console.log(`Error updating profile ${error.message}`);
        }
      );
      setTimeout(() => {
        this.router.navigate(['/user/home']);
      }, 2000);
    } else {
      console.log('Form is invalid. Please check the fields.');
    }
  }
  verifyPhone() {
    console.log('btn clicked');
    console.log(this.myForm.value.phoneNumber);
    try {
      this.userServ
        .verifyPhone(this.myForm.value.phoneNumber)
        .subscribe((res) => {
          console.log('otp send succesfully');
          console.log(res);
          this.showOtp = true;
        });
    } catch (err) {
      console.log(err);
    }
  }

  onVerify() {
    console.log('Verify button clicked');
    console.log('OTP:', this.otp);
    try {
      this.userServ
        .verifyPhoneOtp(this.otp, this.myForm.value.phoneNumber)
        .subscribe((res) => {
          console.log(res.message);
          this.otpMessage = res.message;
          setTimeout(() => {
            this.showOtp = false;
          }, 1000);
        });
    } catch (err) {
      console.log(err);
    }
  }
}
