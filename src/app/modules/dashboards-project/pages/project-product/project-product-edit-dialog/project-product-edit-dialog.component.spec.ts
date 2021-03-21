import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectProductEditDialogComponent } from './project-product-edit-dialog.component';

describe('ProjectSettingProductDialogComponent', () => {
  let component: ProjectProductEditDialogComponent;
  let fixture: ComponentFixture<ProjectProductEditDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectProductEditDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectProductEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
