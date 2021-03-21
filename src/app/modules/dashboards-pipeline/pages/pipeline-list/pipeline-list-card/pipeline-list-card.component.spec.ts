import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PipelineListCardComponent } from './pipeline-list-card.component';

describe('PipelineListCardComponent', () => {
  let component: PipelineListCardComponent;
  let fixture: ComponentFixture<PipelineListCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PipelineListCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PipelineListCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
