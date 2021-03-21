import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OverlayLeadDetailComponent } from './overlay-lead-detail.component';

describe('OverlayLeadDetailComponent', () => {
  let component: OverlayLeadDetailComponent;
  let fixture: ComponentFixture<OverlayLeadDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OverlayLeadDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OverlayLeadDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
