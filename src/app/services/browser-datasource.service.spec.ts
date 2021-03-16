import { TestBed } from '@angular/core/testing';

import { BrowserDatasourceService } from './browser-datasource.service';

describe('BrowserDatasourceService', () => {
  let service: BrowserDatasourceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BrowserDatasourceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
