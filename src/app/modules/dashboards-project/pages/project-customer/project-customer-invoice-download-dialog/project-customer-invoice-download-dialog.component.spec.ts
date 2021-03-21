import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectCustomerInvoiceDownloadDialogComponent } from './project-customer-invoice-download-dialog.component';

describe('ProjectCustomerInvoiceDownloadDialogComponent', () => {
  let component: ProjectCustomerInvoiceDownloadDialogComponent;
  let fixture: ComponentFixture<ProjectCustomerInvoiceDownloadDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectCustomerInvoiceDownloadDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectCustomerInvoiceDownloadDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
