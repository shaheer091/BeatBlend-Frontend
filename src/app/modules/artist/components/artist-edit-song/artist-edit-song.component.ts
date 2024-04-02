import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArtistService } from '../../services/artist.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-artist-edit-song',
  templateUrl: './artist-edit-song.component.html',
  styleUrls: ['./artist-edit-song.component.css'],
})
export class ArtistEditSongComponent implements OnInit, OnDestroy {
  songId!: number;
  editSongForm!: FormGroup;

  getSongDetails$ = new Subscription();
  editSongDetails$ = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private artistServ: ArtistService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.songId = params['id'];
    });
    this.getSongDetails();
    this.initializeForm();
  }

  getSongDetails() {
    this.getSongDetails$ = this.artistServ
      .artistGetSongDetails(this.songId)
      .subscribe({
        next: (res) => {
          this.editSongForm.patchValue({
            title: res.title,
            artist: res.artist,
            album: res.album,
            genre: res.genre,
            duration: res.duration,
          });
        },
        error: (err) => {
          alert(err.error.message);
        },
      });
  }

  initializeForm(): void {
    this.editSongForm = this.formBuilder.group({
      title: [''],
      artist: [''],
      album: [''],
      genre: [''],
      duration: [''],
    });
  }

  onSubmit(): void {
    const editedSongData = this.editSongForm.value;
    this.editSongDetails$ = this.artistServ
      .artistEditSongDetails(this.songId, editedSongData)
      .subscribe({
        next: (res) => {
          if (res.message) {
            setTimeout(() => {
              this.router.navigate(['/artist/songs']);
            }, 1000);
          }
        },
        error: (err) => {
          alert(err.error.message);
        },
      });
  }
  ngOnDestroy(): void {
    this.getSongDetails$?.unsubscribe();
    this.editSongDetails$?.unsubscribe();
  }
}
