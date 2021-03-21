import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectLeadUploadDialogComponent } from './project-lead-upload-dialog.component';

describe('ProjectLeadUploadDialogComponent', () => {
  let component: ProjectLeadUploadDialogComponent;
  let fixture: ComponentFixture<ProjectLeadUploadDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectLeadUploadDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectLeadUploadDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
