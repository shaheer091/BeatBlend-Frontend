import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from '../../../services/user.service';

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
    private userServ: UserService
  ) {}

  ngOnInit(): void {
    this.myForm = this.formBuilder.group({
      file: [''],
      bio:[''],
      username: [''],
      email: [''],
      phoneNumber: [''],
      date: [''],
      gender: [''],
    });
    this.userServ.getUserProfile().subscribe((res) => {
      this.userData = res.user;
      console.log(this.userData);
      this.myForm.controls['username'].setValue(this.userData.username);
      this.myForm.controls['email'].setValue(this.userData.email);
    });
  }

  onSubmit(): void {
    if (this.myForm.valid) {
      console.log(this.myForm.value);
    } else {
      console.log('Form is invalid. Please check the fields.');
    }
  }
}
