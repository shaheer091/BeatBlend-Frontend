import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserHomepageComponent } from './components/user-homepage/user-homepage.component';
import { UserRoutingModule } from './routes/user-route.module';
import { SettingsPageComponent } from './components/settings-page/settings-page.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { SearchComponent } from './components/search/search.component';

@NgModule({
  declarations: [
    UserHomepageComponent,
    SettingsPageComponent,
    ProfileComponent,
    SideBarComponent,
    SearchComponent
  ],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    CommonModule,
    UserRoutingModule,
  ],
  providers: [],
  exports: [],
})
export class UserModule {}
 