import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  password: any;
  usernameOrEmail: any;
  message: any;

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
    try {
      if (this.loginForm.valid) {
        console.log(this.loginForm.value);
        console.log('login button clicked');
        this.serv.apiLogin(this.loginForm.value).subscribe((res) => {
          console.log(res.message);
          if (res.success) {
            localStorage.setItem('token', res.token);
            console.log(res.token);
            this.router.navigate(['/user/home']);
          } else {
            this.message = res.message;
          }
        });
      } else {
        console.log('Invalid form. Please check the fields.');
      }
    } catch (err) {
      console.log(err);
    }
  }
}