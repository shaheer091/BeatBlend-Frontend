import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BandAddSongComponent } from './band-add-song.component';

describe('BandAddSongComponent', () => {
  let component: BandAddSongComponent;
  let fixture: ComponentFixture<BandAddSongComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BandAddSongComponent]
    });
    fixture = TestBed.createComponent(BandAddSongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
