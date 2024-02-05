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
import { InterfaceComponent } from './components/homepage/interface/interface.component';
import { AccessComponent } from './components/homepage/access/access.component';
import { HowitworksComponent } from './components/homepage/howitworks/howitworks.component';
import { ConceptsComponent } from './components/homepage/concepts/concepts.component';
import { SubscriptionComponent } from './components/homepage/subscription/subscription.component';
import { PremiumComponent } from './components/homepage/premium/premium.component';
import { FooterComponent } from './components/homepage/footer/footer.component';

@NgModule({
  declarations: [
    SignupComponent,
    HomepageComponent,
    OtpVerificationComponent,
    NavBarComponent,
    LoginComponent,
    InterfaceComponent,
    AccessComponent,
    HowitworksComponent,
    ConceptsComponent,
    SubscriptionComponent,
    PremiumComponent,
    FooterComponent,
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
