import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormFieldGreenComponent } from './form-field-green.component';

describe('FormFieldGreenComponent', () => {
  let component: FormFieldGreenComponent;
  let fixture: ComponentFixture<FormFieldGreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormFieldGreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormFieldGreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
