import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupportCategoryComponent } from './support-category.component';

describe('CategoryOneComponent', () => {
  let component: SupportCategoryComponent;
  let fixture: ComponentFixture<SupportCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupportCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupportCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
