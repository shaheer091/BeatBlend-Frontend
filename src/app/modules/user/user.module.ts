import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SignupComponent } from './components/signup/signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomepageComponent } from './components/homepage/homepage.component';
import { OtpVerificationComponent } from './components/signup/otp-verification/otp-verification.component';
import { NavBarComponent } from './components/homepage/nav-bar/nav-bar.component';
import { LoginComponent } from './components/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    SignupComponent,
    HomepageComponent,
    OtpVerificationComponent,
    NavBarComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    CommonModule,
  ],
  providers: [],
  exports: [SignupComponent, HomepageComponent, LoginComponent],
})
export class UserModule {}
