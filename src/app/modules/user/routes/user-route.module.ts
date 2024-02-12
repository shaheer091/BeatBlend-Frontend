import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserHomepageComponent } from '../components/user-homepage/user-homepage.component';
import { AuthService } from 'src/app/guards/authService.guard';
import { SettingsPageComponent } from '../components/user-homepage/settings-page/settings-page.component';
import { ProfileComponent } from '../components/user-homepage/profile/profile.component';

const routes: Routes = [
  {
    path: 'home',
    canActivate: [AuthService],
    component: UserHomepageComponent,
  },
  { path: 'settings', component: SettingsPageComponent },
  { path: 'profile', component: ProfileComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
