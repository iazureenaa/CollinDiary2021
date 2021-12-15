import { TestBed } from '@angular/core/testing';

import { CollinDatabaseService } from './collin-database.service';

describe('CollinDatabaseService', () => {
  let service: CollinDatabaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CollinDatabaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
