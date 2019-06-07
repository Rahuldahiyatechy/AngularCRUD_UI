import { TestBed } from '@angular/core/testing';

import { TFRgridService } from './tfrgrid.service';

describe('TFRgridService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TFRgridService = TestBed.get(TFRgridService);
    expect(service).toBeTruthy();
  });
});
