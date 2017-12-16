import { TestBed, inject } from '@angular/core/testing';

import { JobApplicationService } from './jobapplication.service';

describe('JobapplicationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [JobApplicationService]
    });
  });

  it('should be created', inject([JobApplicationService], (service: JobApplicationService) => {
    expect(service).toBeTruthy();
  }));
});
