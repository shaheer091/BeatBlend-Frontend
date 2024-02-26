import { AfterViewInit, Component, Input, OnChanges, ViewChild } from '@angular/core';

@Component({
  selector: 'app-music-player',
  templateUrl: './music-player.component.html',
  styleUrls: ['./music-player.component.css']
})
export class MusicPlayerComponent implements OnChanges {
  @Input() audio: any;
  @ViewChild('audioPlayer') audioPlayer: any;
  songUrl = '';

  ngOnChanges(): void {
    if(this.audio) {
      this.songUrl=this.audio;
      this.audioPlayer.nativeElement.load();
      this.audioPlayer.nativeElement.play()
    }
  }
}

