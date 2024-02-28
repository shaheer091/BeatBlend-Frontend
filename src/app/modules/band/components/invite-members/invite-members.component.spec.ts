import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InviteMembersComponent } from './invite-members.component';

describe('InviteMembersComponent', () => {
  let component: InviteMembersComponent;
  let fixture: ComponentFixture<InviteMembersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InviteMembersComponent]
    });
    fixture = TestBed.createComponent(InviteMembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
