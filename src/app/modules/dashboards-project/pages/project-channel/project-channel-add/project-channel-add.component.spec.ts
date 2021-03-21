import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectChannelAddComponent } from './project-channel-add.component';

describe('ProjectChannelAddComponent', () => {
  let component: ProjectChannelAddComponent;
  let fixture: ComponentFixture<ProjectChannelAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectChannelAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectChannelAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
