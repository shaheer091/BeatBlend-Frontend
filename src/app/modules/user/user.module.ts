import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserHomepageComponent } from './components/user-homepage/user-homepage.component';
import { UserRoutingModule } from './routes/user-route.module';
import { SettingsPageComponent } from './components/user-homepage/settings-page/settings-page.component';
import { ProfileComponent } from './components/user-homepage/profile/profile.component';

@NgModule({
  declarations: [
    UserHomepageComponent,
    SettingsPageComponent,
    ProfileComponent
  ],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    CommonModule,
    UserRoutingModule
  ],
  providers: [],
  exports: [ ],
})
export class UserModule {}
 