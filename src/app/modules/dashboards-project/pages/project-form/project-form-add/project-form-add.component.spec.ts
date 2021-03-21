import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectFormAddComponent } from './project-form-add.component';

describe('ProjectFormAddComponent', () => {
  let component: ProjectFormAddComponent;
  let fixture: ComponentFixture<ProjectFormAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectFormAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectFormAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
