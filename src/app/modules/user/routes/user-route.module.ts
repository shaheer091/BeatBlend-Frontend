import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserHomepageComponent } from '../components/user-homepage/user-homepage.component';
import { AuthService } from 'src/app/guards/authService.guard';
import { NotFoundComponent } from 'src/app/components/not-found/not-found.component';
import { SettingsPageComponent } from '../components/settings-page/settings-page.component';
import { ProfileComponent } from '../components/profile/profile.component';
import { SearchComponent } from '../components/search/search.component';

const routes: Routes = [
  {
    path: 'home',
    canActivate: [AuthService],
    component: UserHomepageComponent,
  },
  { path: 'settings', component: SettingsPageComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'search', component: SearchComponent },
  { path: '', redirectTo: '/user/home', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
