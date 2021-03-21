import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupportImageCategoryComponent } from './support-image-category.component';

describe('ImageCategoryComponent', () => {
  let component: SupportImageCategoryComponent;
  let fixture: ComponentFixture<SupportImageCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupportImageCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupportImageCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
