import { TestBed } from '@angular/core/testing';

import { UpcomingGuardService } from './upcoming-guard.service';

describe('UpcomingGuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UpcomingGuardService = TestBed.get(UpcomingGuardService);
    expect(service).toBeTruthy();
  });
});
