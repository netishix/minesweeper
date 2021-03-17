import { TestBed } from '@angular/core/testing';

import { ActiveGamesResolverService } from './active-games-resolver.service';
import {RouterTestingModule} from "@angular/router/testing";

describe('ActiveGamesResolverService', () => {
  let service: ActiveGamesResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ]
    });
    service = TestBed.inject(ActiveGamesResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
