import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectChannelDialogComponent } from './project-channel-dialog.component';

describe('ProjectChannelDialogComponent', () => {
  let component: ProjectChannelDialogComponent;
  let fixture: ComponentFixture<ProjectChannelDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectChannelDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectChannelDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
