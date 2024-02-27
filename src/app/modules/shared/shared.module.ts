import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MusicPlayerComponent } from './components/music-player/music-player.component';
import { RouterModule } from '@angular/router';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { SharedComponent } from './shared.component';

@NgModule({
  declarations: [MusicPlayerComponent, UserProfileComponent, SharedComponent],
  imports: [CommonModule, RouterModule],
  exports:[MusicPlayerComponent],
})
export class SharedModule {}
