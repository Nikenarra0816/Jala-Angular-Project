import { TestBed } from '@angular/core/testing';

import { DashboardPipelineService } from './dashboard-pipeline.service';

describe('DashboardPipelineService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DashboardPipelineService = TestBed.get(DashboardPipelineService);
    expect(service).toBeTruthy();
  });
});
