import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ArtistService } from '../../services/artist.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-artist-add-song',
  templateUrl: './artist-add-song.component.html',
  styleUrls: ['./artist-add-song.component.css'],
})
export class ArtistAddSongComponent implements OnInit {
  songForm!: FormGroup;
  message:any;
  description:any;
  success:any;

  constructor(
    private formBuilder: FormBuilder,
    private artistServ: ArtistService,
    private router:Router,
  ) {}

  ngOnInit(): void {
    this.songForm = this.formBuilder.group({
      title: ['', Validators.required],
      artist: ['', Validators.required],
      album: ['', Validators.required],
      genre: ['', Validators.required],
      duration: ['1', Validators.required],
      releaseDate: ['', Validators.required],
      songFile: [null, Validators.required],
    });
  }

  onSubmit() {
    if (this.songForm.valid) {
      // Handle form submission here
      console.log('Form submitted!', this.songForm.value);
      this.artistServ.artistAddSong(this.songForm.value).subscribe((res) => {
        console.log(res);
        this.message=res.message;
        this.description=res.description;
        this.success=res.success;
        
      });
    } else {
      console.log('enter valid details');
    }
  }
  goBack(){
    if(this.success){
      this.router.navigate(['artist/home'])
    }
  }
}
