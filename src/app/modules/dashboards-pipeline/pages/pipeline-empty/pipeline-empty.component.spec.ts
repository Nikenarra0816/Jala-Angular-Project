import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PipelineEmptyComponent } from './pipeline-empty.component';

describe('PipelineEmptyComponent', () => {
  let component: PipelineEmptyComponent;
  let fixture: ComponentFixture<PipelineEmptyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PipelineEmptyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PipelineEmptyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
