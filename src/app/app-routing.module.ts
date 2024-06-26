import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AuthService } from './guards/authService.guard';
import { LoginService } from './guards/loginService.guard';
import { AdminLoginGuard } from './modules/admin/guards/adminLogin.guard';
import { ArtistLoginGuard } from './modules/artist/guards/artistLogin.guard';
import { UserProfileComponent } from './modules/shared/components/user-profile/user-profile.component';
import { BandLoginGuard } from './modules/band/guard/band.guard';
import { ChattingComponent } from './modules/shared/components/chatting/chatting.component';

const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'login', canActivate: [LoginService], component: LoginComponent },
  { path: 'signup', canActivate: [LoginService], component: SignupComponent },
  {
    path: 'user',
    canActivate: [AuthService],
    loadChildren: () =>
      import('./modules/user/user.module').then((e) => e.UserModule),
  },
  {
    path: 'admin',
    canActivate: [AdminLoginGuard],
    loadChildren: () =>
      import('./modules/admin/admin.module').then((e) => e.AdminModule),
  },
  {
    path: 'artist',
    canActivate: [ArtistLoginGuard],
    loadChildren: () =>
      import('./modules/artist/artist.module').then((e) => e.ArtistModule),
  },
  {
    path: 'band',
    canActivate: [BandLoginGuard],
    loadChildren: () =>
      import('./modules/band/band.module').then((e) => e.BandModule),
  },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
