import { TestBed, async, inject } from '@angular/core/testing';

import { EmptyProjectGuard } from './empty-project.guard';

describe('EmptyProjectGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EmptyProjectGuard]
    });
  });

  it('should ...', inject([EmptyProjectGuard], (guard: EmptyProjectGuard) => {
    expect(guard).toBeTruthy();
  }));
});
