import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-music-player',
  templateUrl: './music-player.component.html',
  styleUrls: ['./music-player.component.css']
})
export class MusicPlayerComponent implements OnChanges {
  @Input() audio: any;
  songUrl:any;

  ngOnChanges(): void {
    this.songUrl=this.audio;
    console.log("audio",this.audio);
    console.log("songUrl",this.songUrl);
  }
}

