import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupportVideoCategoryComponent } from './support-video-category.component';

describe('VideoCategoryComponent', () => {
  let component: SupportVideoCategoryComponent;
  let fixture: ComponentFixture<SupportVideoCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupportVideoCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupportVideoCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
