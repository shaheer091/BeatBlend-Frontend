import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArtistHomeComponent } from './components/artist-home/artist-home.component';
import { ArtistRoutingModule } from './routes/aritst-route.module';



@NgModule({
  declarations: [
    ArtistHomeComponent
  ],
  imports: [
    CommonModule,
    ArtistRoutingModule
  ]
})
export class ArtistModule { }
