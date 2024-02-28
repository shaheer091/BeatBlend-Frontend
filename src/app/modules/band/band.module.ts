import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BandComponent } from './band.component';
import { BandHomeComponent } from './components/band-home/band-home.component';
import { BandRoutingModule } from './band-routing.module';
import { BandNavbarComponent } from './components/band-navbar/band-navbar.component';
import { BandSongsComponent } from './components/band-songs/band-songs.component';
import { BandAddSongComponent } from './components/band-add-song/band-add-song.component';
import { InviteMembersComponent } from './components/invite-members/invite-members.component';
import { BandProfileComponent } from './components/band-profile/band-profile.component';



@NgModule({
  declarations: [
    BandComponent,
    BandHomeComponent,
    BandNavbarComponent,
    BandSongsComponent,
    BandAddSongComponent,
    InviteMembersComponent,
    BandProfileComponent
  ],
  imports: [
    CommonModule,
    BandRoutingModule
  ]
})
export class BandModule { }
