import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BandComponent } from './band.component';
import { BandHomeComponent } from './components/band-home/band-home.component';
import { BandRoutingModule } from './band-routing.module';
import { BandNavbarComponent } from './components/band-navbar/band-navbar.component';
import { BandSongsComponent } from './components/band-songs/band-songs.component';
import { BandAddSongComponent } from './components/band-add-song/band-add-song.component';
import { BandProfileComponent } from './components/band-profile/band-profile.component';
import { ManageMembersComponent } from './components/manage-members/manage-members.component';



@NgModule({
  declarations: [
    BandComponent,
    BandHomeComponent,
    BandNavbarComponent,
    BandSongsComponent,
    BandAddSongComponent,
    BandProfileComponent,
    ManageMembersComponent
  ],
  imports: [
    CommonModule,
    BandRoutingModule
  ]
})
export class BandModule { }
