import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit, OnDestroy {
  myForm!: FormGroup;
  userData: any;
  userDetails: any;
  showOtp: Boolean = false;
  otp: any;
  otpMessage: any;
  arr: File[] = [];
  formdata = new FormData();

  getUserProfile$ = new Subscription();
  updateProfile$ = new Subscription();
  verifyPhone$ = new Subscription();
  verifyOtp$ = new Subscription();

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
    this.getData();
  }
  getData() {
    this.getUserProfile$ = this.userServ.getUserProfile().subscribe((res) => {
      const { userProfile } = res;
      const { userDetails } = userProfile[0];

      this.userData = userProfile[0];
      this.userDetails = userDetails[0];

      const { username, email } = this.userData;
      const { bio, phoneNumber, dateOfBirth, gender } = this.userDetails;

      const controls = this.myForm.controls;
      controls['username']?.patchValue(username);
      controls['email']?.patchValue(email);
      controls['bio']?.patchValue(bio);
      controls['phoneNumber']?.patchValue(phoneNumber);
      controls['date']?.patchValue(dateOfBirth);
      controls['gender']?.patchValue(gender);
    });
  }

  changing(event: any) {
    const files = event.target.files;
    if (files.length > 0) {
      this.myForm.patchValue({
        file: files[0],
      });
    }
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

      this.updateProfile$ = this.userServ.updateProfile(formdata).subscribe(
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
    try {
      this.verifyPhone$ = this.userServ
        .verifyPhone(this.myForm.value.phoneNumber)
        .subscribe((res) => {
          this.showOtp = true;
        });
    } catch (err) {
      console.log(err);
    }
  }

  onVerify() {
    try {
      this.verifyOtp$ = this.userServ
        .verifyPhoneOtp(this.otp, this.myForm.value.phoneNumber)
        .subscribe((res) => {
          this.otpMessage = res.message;
          setTimeout(() => {
            this.showOtp = false;
          }, 1000);
        });
    } catch (err) {
      console.log(err);
    }
  }

  ngOnDestroy(): void {
    this.getUserProfile$?.unsubscribe();
    this.updateProfile$?.unsubscribe();
    this.verifyOtp$?.unsubscribe();
    this.verifyPhone$?.unsubscribe();
  }
}
