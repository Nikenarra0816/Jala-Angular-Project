import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OverlayOfficerDetailComponent } from './overlay-officer-detail.component';

describe('OverlayOfficerDetailComponent', () => {
  let component: OverlayOfficerDetailComponent;
  let fixture: ComponentFixture<OverlayOfficerDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OverlayOfficerDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OverlayOfficerDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
