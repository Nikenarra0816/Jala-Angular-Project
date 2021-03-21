import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OverlayLeadPipelineComponent } from './overlay-lead-pipeline.component';

describe('OverlayLeadPipelineComponent', () => {
  let component: OverlayLeadPipelineComponent;
  let fixture: ComponentFixture<OverlayLeadPipelineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OverlayLeadPipelineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OverlayLeadPipelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
