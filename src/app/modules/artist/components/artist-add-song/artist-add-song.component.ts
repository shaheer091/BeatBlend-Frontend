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
  reqMsg:any;
  constructor(
    private formBuilder: FormBuilder,
    private artistServ: ArtistService,
    private router:Router,
  ) {}

  ngOnInit(): void {
    this.songForm = this.formBuilder.group({
      title: ['', Validators.required],
      artist: [''],
      album: [''],
      genre: ['',Validators.required],
      duration: [''],
      releaseDate: [''],
      songFile: [null, Validators.required],
    });
  }

  onSubmit() {
    if (this.songForm.valid) {
      console.log('Form submitted!', this.songForm.value);
      this.artistServ.artistAddSong(this.songForm.value).subscribe((res) => {
        console.log(res);
        this.message=res.message;
        this.description=res.description;
        this.success=res.success;
      });
    } else {
      this.reqMsg='enter the required details';
      setTimeout(() => {
        this.reqMsg=''
      }, 3000);
      console.log('enter valid details');
    }
  }
  goBack(){
    if(this.success){
      this.router.navigate(['artist/home'])
    }
  }
}
