import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SignupComponent } from './components/signup/signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomepageComponent } from './components/homepage/homepage.component';

@NgModule({
  declarations: [SignupComponent, HomepageComponent],
  imports: [BrowserModule, ReactiveFormsModule, FormsModule],
  providers: [],
  // bootstrap: [SignupComponent],
  exports: [SignupComponent,HomepageComponent],
})
export class UserModule {}
