import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserHomepageComponent } from './components/user-homepage/user-homepage.component';
import { AuthService } from 'src/app/guards/authService.guard';
import { SettingsPageComponent } from './components/settings-page/settings-page.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SearchComponent } from './components/search/search.component';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { PlaylistComponent } from './components/playlist/playlist.component';
import { UserComponent } from './user.component';
import { UserProfileComponent } from '../shared/components/user-profile/user-profile.component';
import { CreatePlaylistComponent } from './components/create-playlist/create-playlist.component';
import { SinglePlaylistComponent } from './components/single-playlist/single-playlist.component';
import { FollowingListComponent } from '../shared/components/following-list/following-list.component';
import { FollowersListComponent } from '../shared/components/followers-list/followers-list.component';
import { NotificationComponent } from '../shared/components/notification/notification.component';
import { ChattingComponent } from '../shared/components/chatting/chatting.component';

const routes: Routes = [
  {
    path: '',
    // canActivate: [AuthService],
    component: UserComponent,
    children: [
      { path: 'home', component: UserHomepageComponent },
      { path: 'settings', component: SettingsPageComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'search', component: SearchComponent },
      { path: 'favorites', component: FavoritesComponent },
      { path: 'playlist', component: PlaylistComponent },
      { path: 'user-profile/:id', component: UserProfileComponent },
      { path: 'createPlaylist', component: CreatePlaylistComponent },
      { path: 'playlist/:id', component: SinglePlaylistComponent },
      { path: 'followingList', component: FollowingListComponent },
      { path: 'followersList', component: FollowersListComponent },
      { path: 'notification', component: NotificationComponent },
      { path: 'chats/:id', component: ChattingComponent },
      { path: '', redirectTo: '/user/home', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
