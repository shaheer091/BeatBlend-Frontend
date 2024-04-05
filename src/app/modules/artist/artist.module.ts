import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArtistHomeComponent } from './components/artist-home/artist-home.component';
import { ArtistRoutingModule } from './aritst-route.module';
import { ArtistAddSongComponent } from './components/artist-add-song/artist-add-song.component';
import { ArtistNavBarComponent } from './components/artist-nav-bar/artist-nav-bar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ArtistSongListComponent } from './components/artist-song-list/artist-song-list.component';
import { ArtistProfileComponent } from './components/artist-profile/artist-profile.component';
import { ArtistComponent } from './artist.component';
import { SharedModule } from '../shared/shared.module';
import { ArtistEditSongComponent } from './components/artist-edit-song/artist-edit-song.component';
import { ArtistSettingsComponent } from './components/artist-settings/artist-settings.component';
import { LoadingComponent } from '../shared/components/loading/loading.component';

@NgModule({
  declarations: [
    ArtistHomeComponent,
    ArtistAddSongComponent,
    ArtistNavBarComponent,
    ArtistSongListComponent,
    ArtistProfileComponent,
    ArtistComponent,
    ArtistEditSongComponent,
    ArtistSettingsComponent
  ],
  imports: [
    CommonModule,
    ArtistRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    LoadingComponent
  ],
})
export class ArtistModule {}
