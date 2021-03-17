import { TestBed } from '@angular/core/testing';

import { FinishedGamesResolverService } from './finished-games-resolver.service';
import {RouterTestingModule} from "@angular/router/testing";

describe('FinishedGamesResolverService', () => {
  let service: FinishedGamesResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule ]
    });
    service = TestBed.inject(FinishedGamesResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
