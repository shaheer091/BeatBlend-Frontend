import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserHomepageComponent } from '../components/user-homepage/user-homepage.component';
import { AuthService } from 'src/app/guards/authService.guard';
import { SettingsPageComponent } from '../components/user-homepage/settings-page/settings-page.component';
import { ProfileComponent } from '../components/user-homepage/profile/profile.component';
import { NotFoundComponent } from 'src/app/components/not-found/not-found.component';

const routes: Routes = [
  {
    path: 'home',
    canActivate: [AuthService],
    component: UserHomepageComponent,
  },
  { path: 'settings', component: SettingsPageComponent },
  { path: 'profile', component: ProfileComponent },
  { path: '', redirectTo: '/user/home', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
