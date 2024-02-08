import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserHomepageComponent } from '../components/user-homepage/user-homepage.component';
import { AuthService } from 'src/app/guards/authService.guard';

const routes: Routes = [
    { path: 'home', canActivate:[AuthService], component: UserHomepageComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
