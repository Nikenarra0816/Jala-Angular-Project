import { TestBed, async, inject } from '@angular/core/testing';

import { PipelineEmptyGuard } from './pipeline-empty.guard';

describe('PipelineEmptyGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PipelineEmptyGuard]
    });
  });

  it('should ...', inject([PipelineEmptyGuard], (guard: PipelineEmptyGuard) => {
    expect(guard).toBeTruthy();
  }));
});
