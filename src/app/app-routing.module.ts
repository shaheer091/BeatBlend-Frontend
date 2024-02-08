import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AuthService } from './guards/authService.guard';
import { LoginService } from './guards/loginService.guard';

const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'login', canActivate: [LoginService], component: LoginComponent },
  { path: 'signup', canActivate: [LoginService], component: SignupComponent },
  {
    path: 'user',
    loadChildren: () =>
      import('./modules/user/user.module').then((e) => e.UserModule),
    canActivate: [AuthService],
  },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
