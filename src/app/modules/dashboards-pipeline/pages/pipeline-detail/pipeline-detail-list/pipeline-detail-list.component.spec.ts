import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PipelineDetailListComponent } from './pipeline-detail-list.component';

describe('PipelineDetailListComponent', () => {
  let component: PipelineDetailListComponent;
  let fixture: ComponentFixture<PipelineDetailListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PipelineDetailListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PipelineDetailListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
