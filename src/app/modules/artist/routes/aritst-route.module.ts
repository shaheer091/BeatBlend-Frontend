import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArtistHomeComponent } from '../components/artist-home/artist-home.component';
import { ArtistLoginGuard } from '../guards/artistLogin.guard';
import { ArtistAddSongComponent } from '../components/artist-add-song/artist-add-song.component';
import { NotFoundComponent } from 'src/app/components/not-found/not-found.component';

const routes: Routes = [
  {
    path: 'home',
    canActivate: [ArtistLoginGuard],
    component: ArtistHomeComponent,
  },
  {
    path:'addSong',
    component:ArtistAddSongComponent
  },
  {
    path:'**',
    component:NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ArtistRoutingModule {}
