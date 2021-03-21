import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PipelineEmptyAddComponent } from './pipeline-empty-add.component';

describe('PipelineEmptyAddComponent', () => {
  let component: PipelineEmptyAddComponent;
  let fixture: ComponentFixture<PipelineEmptyAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PipelineEmptyAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PipelineEmptyAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
