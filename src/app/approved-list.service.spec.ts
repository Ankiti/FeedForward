import { TestBed } from '@angular/core/testing';

import { ApprovedListService } from './approved-list.service';

describe('ApprovedListService', () => {
  let service: ApprovedListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApprovedListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
