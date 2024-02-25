import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MusicPlayerComponent } from './components/music-player/music-player.component';

@NgModule({
  declarations: [MusicPlayerComponent],
  imports: [CommonModule],
  exports:[MusicPlayerComponent],
})
export class SharedModule {}
