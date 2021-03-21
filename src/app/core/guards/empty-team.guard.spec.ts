import { TestBed, async, inject } from '@angular/core/testing';

import { EmptyTeamGuard } from './empty-team.guard';

describe('EmptyTeamGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EmptyTeamGuard]
    });
  });

  it('should ...', inject([EmptyTeamGuard], (guard: EmptyTeamGuard) => {
    expect(guard).toBeTruthy();
  }));
});
