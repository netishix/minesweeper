import { TestBed } from '@angular/core/testing';

import { FinishedGamesResolverService } from './finished-games-resolver.service';

describe('FinishedGamesResolverService', () => {
  let service: FinishedGamesResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FinishedGamesResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
