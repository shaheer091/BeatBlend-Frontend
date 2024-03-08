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
import { CreateBandComponent } from './components/create-band/create-band.component';
import { ArtistSettingsComponent } from './components/artist-settings/artist-settings.component';
import { NotificationComponent } from '../shared/components/notification/notification.component';

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
      { path: 'settings', component: ArtistSettingsComponent },
      { path: 'editSong/:id', component: ArtistEditSongComponent },
      { path: 'followingList', component: FollowingListComponent },
      { path: 'followersList', component: FollowersListComponent },
      { path: 'createBand', component: CreateBandComponent },
      { path: 'notification', component: NotificationComponent },
      { path: '', redirectTo: '/artist/home', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ArtistRoutingModule {}
