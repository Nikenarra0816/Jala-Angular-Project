import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OverlayTeamDetailComponent } from './overlay-team-detail.component';

describe('OverlayTeamDetailComponent', () => {
  let component: OverlayTeamDetailComponent;
  let fixture: ComponentFixture<OverlayTeamDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OverlayTeamDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OverlayTeamDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
