import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PipelineDetailAddComponent } from './pipeline-detail-add.component';

describe('PipelineDetailAddComponent', () => {
  let component: PipelineDetailAddComponent;
  let fixture: ComponentFixture<PipelineDetailAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PipelineDetailAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PipelineDetailAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
