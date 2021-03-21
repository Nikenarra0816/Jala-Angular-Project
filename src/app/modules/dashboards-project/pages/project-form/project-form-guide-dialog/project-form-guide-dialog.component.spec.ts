import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectFormGuideDialogComponent } from './project-form-guide-dialog.component';

describe('ProjectFormGuideDialogComponent', () => {
  let component: ProjectFormGuideDialogComponent;
  let fixture: ComponentFixture<ProjectFormGuideDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectFormGuideDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectFormGuideDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
