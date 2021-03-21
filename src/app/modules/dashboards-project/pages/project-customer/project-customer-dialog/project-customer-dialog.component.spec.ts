import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectCustomerDialogComponent } from './project-customer-dialog.component';

describe('ProjectCustomerDialogComponent', () => {
  let component: ProjectCustomerDialogComponent;
  let fixture: ComponentFixture<ProjectCustomerDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectCustomerDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectCustomerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
