import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-login', // Update selector as per your application
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'], // Update styles as per your application
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  password: any;
  usernameOrEmail: any;
  message:any;

  constructor(
    private formBuilder: FormBuilder,
    private serv: CommonService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initLoginForm();
  }

  initLoginForm(): void {
    this.loginForm = this.formBuilder.group({
      usernameOrEmail: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  onLogin(): void {
    if (this.loginForm.valid) {
      // Perform login logic here
      console.log(this.loginForm.value);
      console.log('login button clicked');
      this.serv.apiLogin(this.loginForm.value).subscribe((res) => {
        console.log(res.message);
        if (res.success) {
          this.router.navigate(['']);
        }else{
          this.message=res.message
        }
      });
    } else {
      // Handle form validation errors
      console.log('Invalid form. Please check the fields.');
    }
  }
}
