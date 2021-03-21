import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectCustomerTableComponent } from './project-customer-table.component';

describe('ProjectCustomerTableComponent', () => {
  let component: ProjectCustomerTableComponent;
  let fixture: ComponentFixture<ProjectCustomerTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectCustomerTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectCustomerTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
