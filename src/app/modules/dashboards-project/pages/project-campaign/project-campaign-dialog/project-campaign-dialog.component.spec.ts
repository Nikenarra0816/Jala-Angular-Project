import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectCampaignDialogComponent } from './project-campaign-dialog.component';

describe('ProjectCampaignDialogComponent', () => {
  let component: ProjectCampaignDialogComponent;
  let fixture: ComponentFixture<ProjectCampaignDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectCampaignDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectCampaignDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
