import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArtistHomeComponent } from '../components/artist-home/artist-home.component';
import { ArtistLoginGuard } from '../guards/artistLogin.guard';

const routes: Routes = [
  {
    path: 'home',
    canActivate: [ArtistLoginGuard],
    component: ArtistHomeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ArtistRoutingModule {}
