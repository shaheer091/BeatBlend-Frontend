import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserModule } from './modules/user/user.module';
import { HttpClientModule } from '@angular/common/http';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { OtpVerificationComponent } from './components/signup/otp-verification/otp-verification.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { NavBarComponent } from './components/homepage/nav-bar/nav-bar.component';
import { InterfaceComponent } from './components/homepage/interface/interface.component';
import { AccessComponent } from './components/homepage/access/access.component';
import { HowitworksComponent } from './components/homepage/howitworks/howitworks.component';
import { ConceptsComponent } from './components/homepage/concepts/concepts.component';
import { SubscriptionComponent } from './components/homepage/subscription/subscription.component';
import { PremiumComponent } from './components/homepage/premium/premium.component';
import { FooterComponent } from './components/homepage/footer/footer.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    OtpVerificationComponent,
    HomepageComponent,
    NavBarComponent,
    InterfaceComponent,
    AccessComponent,
    HowitworksComponent,
    ConceptsComponent,
    SubscriptionComponent,
    PremiumComponent,
    FooterComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    UserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    CommonModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
