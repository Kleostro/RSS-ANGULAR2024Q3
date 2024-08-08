import { TestBed } from '@angular/core/testing';

import LoadingService from './loading.service';

describe('LoadingService', () => {
  let service: LoadingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoadingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have a default value of false for isLoading$', (done) => {
    service.getIsLoading().subscribe((value) => {
      expect(value).toBe(false);
      done();
    });
  });

  it('should be able to toggle loading state to true', (done) => {
    service.toggleLoading(true);
    service.getIsLoading().subscribe((value) => {
      expect(value).toBe(true);
      done();
    });
  });

  it('should be able to toggle loading state to false', (done) => {
    service.toggleLoading(true);
    service.toggleLoading(false);
    service.getIsLoading().subscribe((value) => {
      expect(value).toBe(false);
      done();
    });
  });
});
