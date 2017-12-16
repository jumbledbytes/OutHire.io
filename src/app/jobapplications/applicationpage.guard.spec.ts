import { TestBed, async, inject } from '@angular/core/testing';

import { ApplicationPageGuard } from './applicationpage.guard';

describe('ApplicationPageGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApplicationPageGuard]
    });
  });

  it('should ...', inject([ApplicationPageGuard], (guard: ApplicationPageGuard) => {
    expect(guard).toBeTruthy();
  }));
});
