import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectEmptyComponent } from './project-empty.component';

describe('ProjectEmptyComponent', () => {
  let component: ProjectEmptyComponent;
  let fixture: ComponentFixture<ProjectEmptyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectEmptyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectEmptyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
