import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PipelineDetailEditComponent } from './pipeline-detail-edit.component';

describe('PipelineDetailEditComponent', () => {
  let component: PipelineDetailEditComponent;
  let fixture: ComponentFixture<PipelineDetailEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PipelineDetailEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PipelineDetailEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
