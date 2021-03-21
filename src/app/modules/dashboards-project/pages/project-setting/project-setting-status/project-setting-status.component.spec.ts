import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectSettingStatusComponent } from './project-setting-status.component';

describe('ProjectSettingStatusComponent', () => {
  let component: ProjectSettingStatusComponent;
  let fixture: ComponentFixture<ProjectSettingStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectSettingStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectSettingStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
