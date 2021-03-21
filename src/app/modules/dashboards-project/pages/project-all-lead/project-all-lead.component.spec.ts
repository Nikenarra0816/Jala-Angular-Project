import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectAllLeadComponent } from './project-all-lead.component';

describe('ProjectAllLeadComponent', () => {
  let component: ProjectAllLeadComponent;
  let fixture: ComponentFixture<ProjectAllLeadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectAllLeadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectAllLeadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
