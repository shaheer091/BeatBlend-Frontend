import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BandLoginGuard } from './guard/band.guard';
import { BandComponent } from './band.component';
import { BandHomeComponent } from './components/band-home/band-home.component';
import { BandProfileComponent } from './components/band-profile/band-profile.component';
import { BandAddSongComponent } from './components/band-add-song/band-add-song.component';
import { BandSongsComponent } from './components/band-songs/band-songs.component';
import { ManageMembersComponent } from './components/manage-members/manage-members.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [BandLoginGuard],
    component: BandComponent,
    children: [
      { path: 'home', component: BandHomeComponent },
      { path: 'songs', component: BandSongsComponent },
      { path: 'profile', component: BandProfileComponent },
      { path: 'addSongs', component: BandAddSongComponent },
      { path: 'manageMembers', component: ManageMembersComponent },
      { path: '', redirectTo: '/band/home', pathMatch: 'full' },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BandRoutingModule {}
