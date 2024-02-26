import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MusicPlayerComponent } from './components/music-player/music-player.component';
import { RouterModule } from '@angular/router';
import { UserProfileComponent } from './components/user-profile/user-profile.component';

@NgModule({
  declarations: [MusicPlayerComponent, UserProfileComponent],
  imports: [CommonModule, RouterModule],
  exports:[MusicPlayerComponent],
})
export class SharedModule {}
