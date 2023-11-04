import { TestBed } from '@angular/core/testing';

import { RoutificService } from './routific.service';

describe('RoutificService', () => {
  let service: RoutificService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoutificService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
