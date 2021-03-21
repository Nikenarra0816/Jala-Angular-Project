import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectProductTableComponent } from './project-product-table.component';

describe('ProjectSettingProductComponent', () => {
  let component: ProjectProductTableComponent;
  let fixture: ComponentFixture<ProjectProductTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectProductTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectProductTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
