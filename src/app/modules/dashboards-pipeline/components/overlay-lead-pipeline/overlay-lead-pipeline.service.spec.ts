import { TestBed } from '@angular/core/testing';

import { OverlayLeadPipelineService } from './overlay-lead-pipeline.service';

describe('OverlayLeadPipelineService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OverlayLeadPipelineService = TestBed.get(OverlayLeadPipelineService);
    expect(service).toBeTruthy();
  });
});
