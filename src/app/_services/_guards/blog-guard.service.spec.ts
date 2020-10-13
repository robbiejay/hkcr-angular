import { TestBed } from '@angular/core/testing';

import { BlogGuardService } from './blog-guard.service';

describe('BlogGuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BlogGuardService = TestBed.get(BlogGuardService);
    expect(service).toBeTruthy();
  });
});
