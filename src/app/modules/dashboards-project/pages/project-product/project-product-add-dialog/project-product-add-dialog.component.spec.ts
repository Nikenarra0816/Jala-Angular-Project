import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectProductAddDialogComponent } from './project-product-add-dialog.component';

describe('ProjectSettingProductAddDialogComponent', () => {
  let component: ProjectProductAddDialogComponent;
  let fixture: ComponentFixture<ProjectProductAddDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectProductAddDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectProductAddDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
