import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './modules/user/components/homepage/homepage.component';
import { SignupComponent } from './modules/user/components/signup/signup.component';
import { LoginComponent } from './modules/user/components/login/login.component';
import { OtpVerificationComponent } from './modules/user/components/signup/otp-verification/otp-verification.component';

const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'otpVerification', component: OtpVerificationComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
