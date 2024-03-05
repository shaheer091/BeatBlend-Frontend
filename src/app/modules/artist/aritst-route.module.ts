import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArtistHomeComponent } from './components/artist-home/artist-home.component';
import { ArtistLoginGuard } from './guards/artistLogin.guard';
import { ArtistAddSongComponent } from './components/artist-add-song/artist-add-song.component';
import { ArtistSongListComponent } from './components/artist-song-list/artist-song-list.component';
import { ArtistProfileComponent } from './components/artist-profile/artist-profile.component';
import { ArtistComponent } from './artist.component';
import { ArtistEditSongComponent } from './components/artist-edit-song/artist-edit-song.component';
import { FollowingListComponent } from '../shared/components/following-list/following-list.component';
import { FollowersListComponent } from '../shared/components/followers-list/followers-list.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [ArtistLoginGuard],
    component: ArtistComponent,
    children: [
      { path: 'home', component: ArtistHomeComponent },
      { path: 'addSong', component: ArtistAddSongComponent },
      { path: 'songs', component: ArtistSongListComponent },
      { path: 'profile', component: ArtistProfileComponent },
      { path: 'editSong/:id', component: ArtistEditSongComponent },
      { path: 'followingList', component: FollowingListComponent },
      { path: 'followersList', component: FollowersListComponent },
      { path: '', redirectTo: '/artist/home', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ArtistRoutingModule {}
