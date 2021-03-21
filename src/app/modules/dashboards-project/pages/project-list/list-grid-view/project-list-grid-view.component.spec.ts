import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectListGridViewComponent } from './project-list-grid-view.component';

describe('ListGridViewComponent', () => {
  let component: ProjectListGridViewComponent;
  let fixture: ComponentFixture<ProjectListGridViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectListGridViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectListGridViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
