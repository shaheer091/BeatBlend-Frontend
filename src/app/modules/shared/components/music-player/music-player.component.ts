import {
  AfterViewInit,
  Component,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { SharedServiceService } from '../../services/shared-service.service';

@Component({
  selector: 'app-music-player',
  templateUrl: './music-player.component.html',
  styleUrls: ['./music-player.component.css'],
})
export class MusicPlayerComponent implements OnInit, AfterViewInit {
  @ViewChild('audioPlayer') audioPlayer: any;
  constructor(private songServ: SharedServiceService) {}
  storedSongUrl: any;
  storedTime: any;
  songUrl = '';

  ngOnInit(): void {
    this.songServ.songUrl$.subscribe((url: string) => {
      this.songUrl = url;
      this.playSong();
    });
    window.addEventListener('beforeunload', () => {
      this.storeSongInfo();
    });
  }

  ngAfterViewInit(): void {
    if (this.audioPlayer) {
      this.loadStoredSong();
    }
  }

  loadStoredSong(): void {
    this.storedSongUrl = localStorage.getItem('songLink');
    this.songUrl = this.storedSongUrl;
    this.storedTime = localStorage.getItem('songTime');

    if (this.storedSongUrl && this.storedTime) {
      this.audioPlayer.nativeElement.src = this.storedSongUrl;
      this.audioPlayer.nativeElement.currentTime = parseFloat(this.storedTime);
      this.playSong();
    }
  }

  storeSongInfo(): void {
    localStorage.setItem('songLink', this.songUrl);
    localStorage.setItem(
      'songTime',
      this.audioPlayer.nativeElement.currentTime.toString()
    );
  }

  playSong() {
    if (!this.audioPlayer || !this.audioPlayer.nativeElement) {
      return;
    }
    if (!this.songUrl) {
      this.loadStoredSong(); // Load from local storage if songUrl is empty
    } else {
      this.audioPlayer.nativeElement.src = this.songUrl;
      this.audioPlayer.nativeElement.load();
      this.audioPlayer.nativeElement.play();
    }
  }
}
