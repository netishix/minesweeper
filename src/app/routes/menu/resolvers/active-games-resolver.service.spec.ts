import { TestBed } from '@angular/core/testing';

import { ActiveGamesResolverService } from './active-games-resolver.service';

describe('ActiveGamesResolverService', () => {
  let service: ActiveGamesResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActiveGamesResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
