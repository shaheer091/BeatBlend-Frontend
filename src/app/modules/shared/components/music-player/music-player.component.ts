import {
  AfterViewInit,
  Component,
  Input,
  OnChanges,
  ViewChild,
} from '@angular/core';
import { SharedServiceService } from '../../services/shared-service.service';

@Component({
  selector: 'app-music-player',
  templateUrl: './music-player.component.html',
  styleUrls: ['./music-player.component.css'],
})
export class MusicPlayerComponent{
  @ViewChild('audioPlayer') audioPlayer: any;
  constructor(private songServ: SharedServiceService) {
    this.songServ.songUrl$.subscribe((url: string) => {
      this.songUrl = url;
      this.playSong();
    });
  }
  songUrl = '';

  playSong() {
    if (this.songUrl) {
      this.audioPlayer.nativeElement.src = this.songUrl;
      this.audioPlayer.nativeElement.load();
      this.audioPlayer.nativeElement.play();
    }
  }
}
