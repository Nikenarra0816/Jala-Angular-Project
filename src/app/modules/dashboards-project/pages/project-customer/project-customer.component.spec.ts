import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectCustomerComponent } from './project-customer.component';

describe('ProjectCustomerComponent', () => {
  let component: ProjectCustomerComponent;
  let fixture: ComponentFixture<ProjectCustomerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectCustomerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
