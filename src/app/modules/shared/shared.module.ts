import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MusicPlayerComponent } from './components/music-player/music-player.component';
import { RouterModule } from '@angular/router';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { SharedComponent } from './shared.component';
import { FollowersListComponent } from './components/followers-list/followers-list.component';
import { FollowingListComponent } from './components/following-list/following-list.component';
import { NotificationComponent } from './components/notification/notification.component';
import { ChattingComponent } from './components/chatting/chatting.component';
import { FormsModule } from '@angular/forms';
import { BandProfileComponent } from './components/band-profile/band-profile.component';
import { LoadingComponent } from './components/loading/loading.component';

@NgModule({
  declarations: [
    MusicPlayerComponent,
    UserProfileComponent,
    SharedComponent,
    FollowersListComponent,
    FollowingListComponent,
    NotificationComponent,
    ChattingComponent,
    BandProfileComponent,
  ],
  imports: [CommonModule, RouterModule, FormsModule,LoadingComponent],
  exports: [MusicPlayerComponent],
})
export class SharedModule {}
