import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SignupComponent } from './components/signup/signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomepageComponent } from './components/homepage/homepage.component';
import { OtpVerificationComponent } from './components/signup/otp-verification/otp-verification.component';

@NgModule({
  declarations: [SignupComponent, HomepageComponent, OtpVerificationComponent],
  imports: [BrowserModule, ReactiveFormsModule, FormsModule],
  providers: [],
  exports: [SignupComponent],
})
export class UserModule {}
