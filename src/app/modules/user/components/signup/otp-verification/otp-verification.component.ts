// otp-verification.component.ts
import { Component, Input, Output,EventEmitter } from '@angular/core';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-otp-verification',
  templateUrl: './otp-verification.component.html',
  styleUrls: ['./otp-verification.component.css'],
})
export class OtpVerificationComponent {
  constructor(private signupService:UserService){}
  @Input() data:any
  @Input() otp: any;
  enteredOTP: any;
  @Output() hide:EventEmitter<Boolean>=new EventEmitter<Boolean>();
  
  
  onVerifyOTP(): void {
    console.log(`serverOTP ${this.otp} ,enteredOTP ${this.enteredOTP}`);
    console.log(this.data);
    
    const fulldata={sendedotp:this.otp,enteredotp:this.enteredOTP,...this.data}
    console.log(fulldata);
  
    this.signupService
      .apiVerifyOtp(fulldata)
      .subscribe((response) => {
        console.log(response);
        console.log(this.otp);
      });
  }

  goBck(){
    this.hide.emit(false)
    console.log('btn clicked');
  }
}
