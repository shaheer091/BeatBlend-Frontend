import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SignupComponent } from './components/signup/signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomepageComponent } from './components/homepage/homepage.component';
import { OtpVerificationComponent } from './components/signup/otp-verification/otp-verification.component';
import { NavBarComponent } from './components/homepage/nav-bar/nav-bar.component';

@NgModule({
  declarations: [SignupComponent, HomepageComponent, OtpVerificationComponent, NavBarComponent],
  imports: [BrowserModule, ReactiveFormsModule, FormsModule],
  providers: [],
  exports: [SignupComponent,HomepageComponent],
})
export class UserModule {}
