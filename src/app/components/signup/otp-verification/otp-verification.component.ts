// otp-verification.component.ts
import { Component, Input, Output,EventEmitter, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-otp-verification',
  templateUrl: './otp-verification.component.html',
  styleUrls: ['./otp-verification.component.css'],
})
export class OtpVerificationComponent implements OnInit{


  constructor(private signupService:CommonService,private router:Router){}
  ngOnInit(): void {
    console.log("Inited")
  }
  @Input() data:any

  @Input() otp: any;
  @Output() hide:EventEmitter<Boolean>=new EventEmitter<Boolean>();
  
  enteredOTP: any;
  message:any;

  @Output() hideLoading:EventEmitter<Boolean>=new EventEmitter<Boolean>()
  
  
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
        console.log(response.token);
        if(response.success){
          localStorage.setItem('token',response.token)
          setTimeout(() => {
            this.router.navigate(['/user/home'])
          }, 2000);
        }
      });
  }

  goBck(){
    this.hide.emit(false)
    console.log('hide clicked false');
    this.hideLoading.emit(false)
    console.log('hideLoading clicked false');
  }
}
