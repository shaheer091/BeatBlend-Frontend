import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  myForm!: FormGroup;
  userData: any;

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
      this.userData = res.userProfile;
      console.log(this.userData);
      this.myForm.controls['username'].setValue(this.userData[0].username);
      this.myForm.controls['email'].setValue(this.userData[0].email);
      this.myForm.controls['bio'].setValue(this.userData[0].userDetails[0].bio);
      this.myForm.controls['phoneNumber'].setValue(
        this.userData[0].userDetails[0].phoneNumber
      );
      this.myForm.controls['date'].setValue(
        this.userData[0].userDetails[0].dateOfBirth
      );
      this.myForm.controls['gender'].setValue(
        this.userData[0].userDetails[0].gender
      );
      // this.myForm.controls['file'].setValue(this.userData[0].userDetails[0].imageUrl)
    });
  }
  // phoneNumber: number = this.myForm.value;
  message: string = '';
  onSubmit(): void {
    if (this.myForm.valid) {
      console.log(this.myForm.value);
      this.userServ.updateProfile(this.myForm.value).subscribe(
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
      this.userServ.verifyPhone(this.myForm.value.phoneNumber).subscribe((res) => {
        console.log('otp send succesfully');
        // console.log(this.myForm.value);
        console.log(res);
      });
    } catch (err) {
      console.log(err);
    }
  }
}