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
  showLoading:any;

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
    this.showLoading=true;
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
    this.getUserProfile$ = this.userServ.getUserProfile().subscribe({
      next: (res) => {    
        this.showLoading=false;
        const userProfile = res.userProfile[0];

        const controls = this.myForm.controls;
        controls['username']?.patchValue(userProfile?.username);
        controls['email']?.patchValue(userProfile?.email);
        controls['bio']?.patchValue(userProfile?.bio);
        controls['phoneNumber']?.patchValue(userProfile?.phoneNumber);
        controls['date']?.patchValue(userProfile?.dateOfBirth);
        controls['gender']?.patchValue(userProfile?.gender);
      },
      error: (err) => {
        alert(err.error.message);
      },
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
      this.showLoading=true
      const formdata = new FormData();
      const value = this.myForm.value;
      formdata.append('bio', value.bio);
      formdata.append('username', value.username);
      formdata.append('email', value.email);
      formdata.append('phoneNumber', value.phoneNumber);
      formdata.append('date', value.date);
      formdata.append('gender', value.gender);
      formdata.append('file', value.file);

      this.updateProfile$ = this.userServ.updateProfile(formdata).subscribe({
        next: (res) => {
          this.showLoading=false
          setTimeout(() => {
            this.message = res.message;
          }, 1000);
          this.message = 'please wait saving the changes ...';
        },
        error: (error) => {
          alert(error.error.message)

        },
      });
      setTimeout(() => {
        this.router.navigate(['/user/home']);
      }, 2000);
    } else {
      alert('Form is invalid. Please check the fields.');
    }
  }
  verifyPhone() {
    try {
      this.showLoading=true;
      this.verifyPhone$ = this.userServ
        .verifyPhone(this.myForm.value.phoneNumber)
        .subscribe({
          next: (res) => {
            this.showLoading=false
            this.showOtp = true;
          },
          error: (err) => {
            alert(err.error.message);
          },
        });
    } catch (err) {
      alert(err);
    }
  }

  onVerify() {
    try {
      this.showLoading=true;
      this.verifyOtp$ = this.userServ
        .verifyPhoneOtp(this.otp, this.myForm.value.phoneNumber)
        .subscribe({
          next: (res) => {
            this.showLoading=false;
            this.otpMessage = res.message;
            setTimeout(() => {
              this.showOtp = false;
            }, 1000);
          },
          error: (err) => {
            alert(err.error.message);
          },
        });
    } catch (err) {
      alert(err);
    }
  }

  ngOnDestroy(): void {
    this.getUserProfile$?.unsubscribe();
    this.updateProfile$?.unsubscribe();
    this.verifyOtp$?.unsubscribe();
    this.verifyPhone$?.unsubscribe();
  }
}
