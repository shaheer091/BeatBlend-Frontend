import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { BandService } from '../../services/band.service';

@Component({
  selector: 'app-band-add-song',
  templateUrl: './band-add-song.component.html',
  styleUrls: ['./band-add-song.component.css'],
})
export class BandAddSongComponent {
  songForm!: FormGroup;
  message: any;
  description: any;
  success: any;
  reqMsg: any;
  formData = new FormData();
  addSong$ = new Subscription();
  songId: any;
  songDetails: any;

  constructor(
    private formBuilder: FormBuilder,
    private bandServ: BandService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((id) => {
      this.songId = id['id'];
    });
    if (this.songId) {
      this.bandServ.getBandSingleSong(this.songId).subscribe({
        next: (res) => {
          this.songDetails = res;
          if (this.songDetails) {
            this.setSongFormValues(this.songDetails);
          }
        },
        error: (err) => {
          alert(err.error.message)
        },
      });
    }
    this.songForm = this.formBuilder.group({
      title: ['', Validators.required],
      album: [''],
      genre: ['', Validators.required],
      duration: [''],
      releaseDate: [''],
      songFile: ['', Validators.required],
    });
    if (this.songId) {
      this.songForm.get('songFile')?.disable();
      this.songForm.get('releaseDate')?.disable();
    }
  }
  setSongFormValues(songDetails: any) {
    this.songForm.patchValue({
      title: songDetails.title,
      album: songDetails.album,
      genre: songDetails.genre,
      duration: songDetails.duration,
      releaseDate: songDetails.releaseDate.split('T')[0],
    });
  }

  changing(event: any) {
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
      this.router.navigate(['band/home']);
    }
  }

  updateSong(songId: any) {
    this.bandServ.bandEditSong(this.songForm.value, songId).subscribe({
      next: (res) => {
        this.success = res.success;
        this.message = res.message;
        this.description = res.discription;
      },
      error: (err) => {
        alert(err.error.message)
      },
    });
  }

  ngOnDestroy(): void {
    this.addSong$?.unsubscribe();
  }
}
