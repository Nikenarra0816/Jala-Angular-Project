import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectSettingInformationComponent } from './project-setting-information.component';

describe('ProjectSettingInformationComponent', () => {
  let component: ProjectSettingInformationComponent;
  let fixture: ComponentFixture<ProjectSettingInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectSettingInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectSettingInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
