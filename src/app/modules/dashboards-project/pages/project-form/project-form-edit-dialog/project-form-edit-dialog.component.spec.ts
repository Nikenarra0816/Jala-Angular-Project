import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectFormEditDialogComponent } from './project-form-edit-dialog.component';

describe('ProjectFormEditDialogComponent', () => {
  let component: ProjectFormEditDialogComponent;
  let fixture: ComponentFixture<ProjectFormEditDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectFormEditDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectFormEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
