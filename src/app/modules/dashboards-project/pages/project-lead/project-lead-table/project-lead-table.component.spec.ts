import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectLeadTableComponent } from './project-lead-table.component';

describe('ProjectLeadTableComponent', () => {
  let component: ProjectLeadTableComponent;
  let fixture: ComponentFixture<ProjectLeadTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectLeadTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectLeadTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
