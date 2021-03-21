import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectChannelListViewComponent } from './project-channel-list-view.component';

describe('ProjectChannelListViewComponent', () => {
  let component: ProjectChannelListViewComponent;
  let fixture: ComponentFixture<ProjectChannelListViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectChannelListViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectChannelListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
