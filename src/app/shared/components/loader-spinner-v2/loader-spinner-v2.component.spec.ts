import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoaderSpinnerV2Component } from './loader-spinner-v2.component';

describe('LoaderSpinnerV2Component', () => {
  let component: LoaderSpinnerV2Component;
  let fixture: ComponentFixture<LoaderSpinnerV2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoaderSpinnerV2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoaderSpinnerV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
