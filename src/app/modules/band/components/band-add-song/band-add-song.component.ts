import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { BandService } from '../../services/band.service';

@Component({
  selector: 'app-band-add-song',
  templateUrl: './band-add-song.component.html',
  styleUrls: ['./band-add-song.component.css']
})
export class BandAddSongComponent {
  songForm!: FormGroup;
  message: any;
  description: any;
  success: any;
  reqMsg: any;
  formData = new FormData();

  addSong$ = new Subscription();

  constructor(
    private formBuilder: FormBuilder,
    private bandServ:BandService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.songForm = this.formBuilder.group({
      title: ['', Validators.required],
      album: [''],
      genre: ['', Validators.required],
      duration: [''],
      releaseDate: [''],
      songFile: ['', Validators.required],
    });
  }

  changing(event: any) {
    // this.formData.delete('songFile');
    this.formData.append('songFile', event.target.files[0]);
  }

  onSubmit() {
    if (this.songForm.valid) {
      const value = this.songForm.value;
      this.formData.append('title', value.title);
      this.formData.append('album', value.album);
      this.formData.append('genre', value.genre);
      this.formData.append('duration', value.duration);
      this.formData.append('releaseDate', value.releaseDate);

      this.addSong$ = this.bandServ.bandAddSong(this.formData).subscribe({
        next: (res) => {
          this.message = res.message;
          this.description = res.description;
          this.success = res.success;
          if (res.success) {
          }
        },
        error: (err) => {
          console.error(err);
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
      this.router.navigate(['band/home']);
    }
  }
  ngOnDestroy(): void {
    this.addSong$?.unsubscribe();
  }
}
