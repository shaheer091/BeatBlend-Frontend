import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ArtistService } from '../../services/artist.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-artist-add-song',
  templateUrl: './artist-add-song.component.html',
  styleUrls: ['./artist-add-song.component.css'],
})
export class ArtistAddSongComponent implements OnInit, OnDestroy {
  songForm!: FormGroup;
  message: any;
  description: any;
  success: any;
  reqMsg: any;
  formData = new FormData();
  showLoading:any;

  addSong$ = new Subscription();

  constructor(
    private formBuilder: FormBuilder,
    private artistServ: ArtistService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.songForm = this.formBuilder.group({
      title: ['', Validators.required],
      artist: [''],
      album: [''],
      genre: ['', Validators.required],
      duration: [''],
      releaseDate: [''],
      songFile: ['', Validators.required],
    });
  }

  changing(event: any) {
    this.formData.delete('songFile');
    this.formData.append('songFile', event.target.files[0]);
  }

  onSubmit() {
    if (this.songForm.valid) {
      this.showLoading=true;
      const value = this.songForm.value;
      this.formData.append('title', value.title);
      this.formData.append('artist', value.artist);
      this.formData.append('album', value.album);
      this.formData.append('genre', value.genre);
      this.formData.append('duration', value.duration);
      this.formData.append('releaseDate', value.releaseDate);

      this.addSong$ = this.artistServ.artistAddSong(this.formData).subscribe({
        next: (res) => {
          this.showLoading=false;
          this.message = res.message;
          this.description = res.description;
          this.success = res.success;
          if (res.success) {
          }
        },
        error: (err) => {
          alert(err);
        },
      });
    } else {
      this.reqMsg = 'enter the required details';
      setTimeout(() => {
        this.reqMsg = '';
      }, 3000);
    }
  }
  goBack() {
    if (this.success) {
      this.router.navigate(['artist/home']);
    }
  }
  ngOnDestroy(): void {
    this.addSong$?.unsubscribe();
  }
}
