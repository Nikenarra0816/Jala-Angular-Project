import { TestBed, async, inject } from '@angular/core/testing';

import { CheckProfileGuard } from './check-profile.guard';

describe('CheckProfileGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CheckProfileGuard]
    });
  });

  it('should ...', inject([CheckProfileGuard], (guard: CheckProfileGuard) => {
    expect(guard).toBeTruthy();
  }));
});
