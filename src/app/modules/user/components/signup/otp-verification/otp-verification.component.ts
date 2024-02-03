// otp-verification.component.ts
import { Component, Input, Output,EventEmitter } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-otp-verification',
  templateUrl: './otp-verification.component.html',
  styleUrls: ['./otp-verification.component.css'],
})
export class OtpVerificationComponent {
  constructor(private signupService:UserService,private router:Router){}
  @Input() data:any
  @Input() otp: any;
  enteredOTP: any;
  @Output() hide:EventEmitter<Boolean>=new EventEmitter<Boolean>();
  message:any;
  
  
  onVerifyOTP(): void {
    console.log(`serverOTP ${this.otp} ,enteredOTP ${this.enteredOTP}`);
    console.log(this.data);
    
    const fulldata={sendedotp:this.otp,enteredotp:this.enteredOTP,...this.data}
    console.log(fulldata);
  
    this.signupService.apiVerifyOtp(fulldata).subscribe((response) => {
        console.log(response);
        console.log(this.otp);
        console.log(response.success);
        console.log(response.message);
        this.message=response.message || "An unexpected error occurs"
        if(response.success){
          setTimeout(() => {
            this.router.navigate(['homepage'])
          }, 5000);
        }
      });
  }

  goBck(){
    this.hide.emit(false)
    console.log('btn clicked');
  }
}
