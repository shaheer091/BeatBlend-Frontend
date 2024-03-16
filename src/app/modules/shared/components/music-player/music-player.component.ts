import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { SharedServiceService } from '../../services/shared-service.service';

@Component({
  selector: 'app-music-player',
  templateUrl: './music-player.component.html',
  styleUrls: ['./music-player.component.css'],
})
export class MusicPlayerComponent implements OnInit,AfterViewInit{
  @ViewChild('audioPlayer') audioPlayer: any;
  @Input() storedTime:any
  @Input() storedSongUrl:any;
  constructor(private songServ: SharedServiceService) {
    this.songServ.songUrl$.subscribe((url: string) => {
      this.songUrl = url;
      this.playSong();
    });
  }

  songUrl = '';
  ngAfterViewInit(): void {
    if (this.storedSongUrl && this.storedTime) {
      this.audioPlayer.nativeElement.currentTime = this.storedTime;
      this.songUrl = this.storedSongUrl;
      this.playSong();
    }
  }
  ngOnInit(): void { 
    this.songServ.songUrl$.subscribe((url: string) => {
      this.songUrl = url;
      this.playSong();
    });
  }

  playSong() {
    if (this.songUrl) {
      this.audioPlayer.nativeElement.src = this.songUrl;
      this.audioPlayer.nativeElement.load();
      this.audioPlayer.nativeElement.play();
    }
  }
  

  onTimeUpdate(): void {
    localStorage.setItem('songTime', this.audioPlayer.nativeElement.currentTime.toString());
    localStorage.setItem('songLink', this.songUrl);
  }
}
