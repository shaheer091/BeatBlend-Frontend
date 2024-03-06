import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-create-band',
  templateUrl: './create-band.component.html',
  styleUrls: ['./create-band.component.css'],
})
export class CreateBandComponent implements OnInit {
  bandForm!: FormGroup;
  artists:any;

  constructor(
    private formBuilder: FormBuilder,
    private userServ: UserService
  ) {}

  ngOnInit(): void {
    this.bandForm = this.formBuilder.group({
      bandImage: [null, Validators.required],
      bandName: ['', Validators.required],
      newMember: ['', [Validators.required]],
    });
  }
  searchArtist() {
    const artistName = this.bandForm.value.newMember;
    if (artistName != '') {
      this.userServ.searchArtist(artistName).subscribe({
        next: (res) => {
          this.artists=res.artists;
          console.log(this.artists);
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }

  onSubmit(): void {
    if (this.bandForm.valid) {
      console.log(this.bandForm.value);
    } else {
      console.error('Enter the form details correctly');
    }
  }
}
