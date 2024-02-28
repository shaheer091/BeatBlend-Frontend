import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BandSongsComponent } from './band-songs.component';

describe('BandSongsComponent', () => {
  let component: BandSongsComponent;
  let fixture: ComponentFixture<BandSongsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BandSongsComponent]
    });
    fixture = TestBed.createComponent(BandSongsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
