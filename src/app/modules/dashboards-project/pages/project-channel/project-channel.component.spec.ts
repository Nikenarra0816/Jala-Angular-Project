import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectChannelComponent } from './project-channel.component';

describe('ProjectChannelComponent', () => {
  let component: ProjectChannelComponent;
  let fixture: ComponentFixture<ProjectChannelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectChannelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectChannelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
