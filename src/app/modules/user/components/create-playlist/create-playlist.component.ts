import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-playlist',
  templateUrl: './create-playlist.component.html',
  styleUrls: ['./create-playlist.component.css']
})
export class CreatePlaylistComponent implements OnInit{
  playlistForm!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.playlistForm = this.fb.group({
      playlistTitle: ['', Validators.required],
      playlistImage: ['',],
      songs: ['',]
    });
  }

  onSubmit() {
    console.log(this.playlistForm.value);
  }
}
