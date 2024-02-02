// otp-verification.component.ts
import { Component, Input } from '@angular/core';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-otp-verification',
  templateUrl: './otp-verification.component.html',
  styleUrls: ['./otp-verification.component.css'],
})
export class OtpVerificationComponent {
  constructor(private signupService:UserService){}
  @Input() otp: any;
  enteredOTP: any;
  
  onVerifyOTP(): void {
    console.log(`serverOTP ${this.otp} ,enteredOTP ${this.enteredOTP}`);
    this.signupService
      .apiVerifyOtp({
        sendedotp:this.otp,
        enteredotp:this.enteredOTP,
      })
      .subscribe((response) => {
        console.log(response);
        console.log(this.otp);
        // Handle the response from the server after OTP verification
      });
  }
}
