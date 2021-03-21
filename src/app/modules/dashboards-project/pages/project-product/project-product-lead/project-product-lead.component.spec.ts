import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectProductLeadComponent } from './project-product-lead.component';

describe('ProjectProductLeadComponent', () => {
  let component: ProjectProductLeadComponent;
  let fixture: ComponentFixture<ProjectProductLeadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectProductLeadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectProductLeadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
