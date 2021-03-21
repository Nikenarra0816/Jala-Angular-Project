import { TestBed } from '@angular/core/testing';

import { DashboardReportService } from './dashboard-report.service';

describe('DashboardReportService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DashboardReportService = TestBed.get(DashboardReportService);
    expect(service).toBeTruthy();
  });
});
