import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistSongListComponent } from './artist-song-list.component';

describe('ArtistSongListComponent', () => {
  let component: ArtistSongListComponent;
  let fixture: ComponentFixture<ArtistSongListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ArtistSongListComponent]
    });
    fixture = TestBed.createComponent(ArtistSongListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
