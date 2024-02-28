import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArtistService } from '../../services/artist.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-artist-edit-song',
  templateUrl: './artist-edit-song.component.html',
  styleUrls: ['./artist-edit-song.component.css'],
})
export class ArtistEditSongComponent implements OnInit {
  songId!: number;
  editSongForm!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private artistServ: ArtistService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.songId = params['id'];
      console.log(this.songId);
    });
    this.getSongDetails();
    this.initializeForm();
  }

  getSongDetails() {
    this.artistServ.artistGetSongDetails(this.songId).subscribe({
      next: (res) => {
        console.log(res);
        this.editSongForm.patchValue({
          title: res.title,
          artist: res.artist,
          album: res.album,
          genre: res.genre,
          duration: res.duration,
        });
      },
      error: (err) => {
        console.log(err);
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
    console.log('Edited Song Data:', editedSongData);
    this.artistServ
      .artistEditSongDetails(this.songId, editedSongData)
      .subscribe({
        next: (res) => {
          console.log(res.message);
          if (res.message) {
            setTimeout(() => {
              this.router.navigate(['/artist/songs']);
            }, 1000);
          }
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
}
