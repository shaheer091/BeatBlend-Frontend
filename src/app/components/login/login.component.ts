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
          console.log(res);
          if (res.success) {
            localStorage.setItem('token', res.token);
            localStorage.setItem('role', res.role);
            console.log(res.token);
            if (res.role == 'user') {
              // this.router.navigate(['/user/home']);
              console.log('role user');
              this.router.navigateByUrl('/user/home');
            }

            if (res.role == 'admin') {
              // this.router.navigate(['/admin/home']);
              console.log('role admin');
              this.router.navigateByUrl('/admin/home');
            }

            if (res.role == 'artist') {
              console.log('artist');
              this.router.navigate(['/artist/home']);
            }
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
