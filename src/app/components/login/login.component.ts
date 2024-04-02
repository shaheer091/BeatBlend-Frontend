import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { io } from 'socket.io-client';
import { SharedServiceService } from 'src/app/modules/shared/services/shared-service.service';
import { CommonService } from 'src/app/services/common.service';
import { SocketService } from 'src/app/services/socket.service';
import { environment } from 'src/environments/environment';

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
  senderId:any;

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }

  constructor(
    private formBuilder: FormBuilder,
    private serv: CommonService,
    private router: Router,
    private sharedServ:SharedServiceService,
    private chatServ:SocketService
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
            this.senderId = this.sharedServ.parseJwt();
            this.connectSocket();
            this.serv.toggleToken$.next(true);
            this.serv.role = res.role;
            if (res.isInBand == 'true') {
              localStorage.setItem('isInBand', 'true');
            } else if (res.isInBand == 'false') {
              localStorage.setItem('isInBand', 'false');
            }
            if (this.serv.role) {
              this.router.navigate([`/${this.serv.role}/home`]);
            }
          } else {
            this.message = res.message;
            setTimeout(() => {
              this.message = '';
            }, 2000);
          }
        });
      } else {
        alert('Invalid form. Please check the fields.');
      }
    } catch (error) {
      alert(error)
    }
  }
  connectSocket() {
    this.chatServ.socket = io(environment.socketUrl, {
      auth: {
        userid: `${this.senderId.userId}`,
      },
    });
  }
}
