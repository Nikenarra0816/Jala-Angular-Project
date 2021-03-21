import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PipelineDetailCardComponent } from './pipeline-detail-card.component';

describe('PipelineDetailCardComponent', () => {
  let component: PipelineDetailCardComponent;
  let fixture: ComponentFixture<PipelineDetailCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PipelineDetailCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PipelineDetailCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
