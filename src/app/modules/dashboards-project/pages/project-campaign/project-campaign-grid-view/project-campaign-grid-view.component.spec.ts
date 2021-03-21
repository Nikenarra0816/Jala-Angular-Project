import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectCampaignGridViewComponent } from './project-campaign-grid-view.component';

describe('ProjectCampaignGridViewComponent', () => {
  let component: ProjectCampaignGridViewComponent;
  let fixture: ComponentFixture<ProjectCampaignGridViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectCampaignGridViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectCampaignGridViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
