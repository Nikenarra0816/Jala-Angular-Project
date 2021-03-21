import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectLeadDownloadDialogComponent } from './project-lead-download-dialog.component';

describe('ProjectLeadDownloadDialogComponent', () => {
  let component: ProjectLeadDownloadDialogComponent;
  let fixture: ComponentFixture<ProjectLeadDownloadDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectLeadDownloadDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectLeadDownloadDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
