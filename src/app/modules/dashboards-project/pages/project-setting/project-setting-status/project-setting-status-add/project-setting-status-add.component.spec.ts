import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectSettingStatusAddComponent } from './project-setting-status-add.component';

describe('ProjectSettingStatusAddComponent', () => {
  let component: ProjectSettingStatusAddComponent;
  let fixture: ComponentFixture<ProjectSettingStatusAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectSettingStatusAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectSettingStatusAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
