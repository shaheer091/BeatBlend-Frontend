import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArtistHomeComponent } from '../components/artist-home/artist-home.component';
import { ArtistLoginGuard } from '../guards/artistLogin.guard';
import { ArtistAddSongComponent } from '../components/artist-add-song/artist-add-song.component';
import { NotFoundComponent } from 'src/app/components/not-found/not-found.component';
import { ArtistSongListComponent } from '../components/artist-song-list/artist-song-list.component';

const routes: Routes = [
  {
    path: 'home',
    canActivate: [ArtistLoginGuard],
    component: ArtistHomeComponent,
  },
  {
    path: 'addSong',
    component: ArtistAddSongComponent,
  },
  {
    path: 'songs',
    component: ArtistSongListComponent,
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ArtistRoutingModule {}
