import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectCampaignListViewComponent } from './project-campaign-list-view.component';

describe('ProjectCampaignListViewComponent', () => {
  let component: ProjectCampaignListViewComponent;
  let fixture: ComponentFixture<ProjectCampaignListViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectCampaignListViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectCampaignListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
