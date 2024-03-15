// otp-verification.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-otp-verification',
  templateUrl: './otp-verification.component.html',
  styleUrls: ['./otp-verification.component.css'],
})
export class OtpVerificationComponent {
  constructor(private signupService: CommonService, private router: Router) {}
  
  @Input() data: any;

  @Input() otp: any;
  @Output() hide: EventEmitter<Boolean> = new EventEmitter<Boolean>();

  enteredOTP: any;
  message: any;
  success: any;
  

  @Output() hideLoading: EventEmitter<Boolean> = new EventEmitter<Boolean>();

  onVerifyOTP(): void {

    const fulldata = {
      sendedotp: this.otp,
      enteredotp: this.enteredOTP,
      ...this.data,
    };

    this.signupService.apiVerifyOtp(fulldata).subscribe((response) => {
      this.success = response.success;
      this.message = response.message || 'An unexpected error occurs';
      if (response.success) {
        localStorage.setItem('token', response.token);
        localStorage.setItem('role',response.role);
        setTimeout(() => {
          this.router.navigate(['/user/home']);
        }, 2000);
      }
    });
  }

  goBck() {
    this.hide.emit(false);
    this.hideLoading.emit(false);
  }
}
