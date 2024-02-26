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
  hidePassword: boolean = true;
  role: any;

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }

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
        this.serv.apiLogin(this.loginForm.value).subscribe((res) => {
          if (res.success) {
            localStorage.setItem('token', res.token);
            localStorage.setItem('role', res.role);

            this.role = res.role;
            // if (res.role == 'user') {
            //   // this.router.navigate(['/user/home']);
            //   this.router.navigateByUrl('/user/home');
            // }

            // if (res.role == 'admin') {
            //   // this.router.navigate(['/admin/home']);
            //   this.router.navigateByUrl('/admin/home');
            // }

            // if (res.role == 'artist') {
            //   this.router.navigate(['/artist/home']);
            // }
            if (this.role) {
              this.router.navigate([`/${this.role}/home`]);
            }
          } else {
            this.message = res.message;
            setTimeout(() => {
              this.message = '';
            }, 2000);
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
