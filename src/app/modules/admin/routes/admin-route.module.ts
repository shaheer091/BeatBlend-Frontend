import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminHomeComponent } from '../components/admin-home/admin-home.component';
import { PlanComponent } from '../components/admin-home/plan/plan.component';
import { NotFoundComponent } from 'src/app/components/not-found/not-found.component';
import { AdminLoginGuard } from '../guards/adminLogin.guard';

const routes: Routes = [
  { path: 'home', canActivate: [AdminLoginGuard], component: AdminHomeComponent },
  { path: 'plan', component: PlanComponent },
  { path: '', redirectTo: '/admin/home', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
