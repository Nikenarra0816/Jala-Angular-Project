import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupportCategoryBodyComponent } from './support-category-body.component';

describe('SupportCategoryBodyComponent', () => {
  let component: SupportCategoryBodyComponent;
  let fixture: ComponentFixture<SupportCategoryBodyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupportCategoryBodyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupportCategoryBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
