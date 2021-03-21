import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectChannelGridViewComponent } from './project-channel-grid-view.component';

describe('ProjectChannelGridViewComponent', () => {
  let component: ProjectChannelGridViewComponent;
  let fixture: ComponentFixture<ProjectChannelGridViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectChannelGridViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectChannelGridViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
