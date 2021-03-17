import { TestBed } from '@angular/core/testing';

import { GameResolverService } from './game-resolver.service';
import { RouterTestingModule } from "@angular/router/testing";

describe('GameResolverService', () => {
  let service: GameResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule ]
    });
    service = TestBed.inject(GameResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
