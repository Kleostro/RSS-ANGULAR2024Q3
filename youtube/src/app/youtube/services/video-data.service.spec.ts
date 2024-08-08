import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { addToFavorites, removeCustomCard, removeFromFavorites } from '../../store/actions/videos.actions';
import VideoSearchResponce from '../interfaces/video-response.interface';
import VideoDataService from './video-data.service';

describe('VideoDataService', () => {
  let service: VideoDataService;
  let httpMock: HttpTestingController;
  let store: MockStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [provideMockStore(), VideoDataService],
    });
    service = TestBed.inject(VideoDataService);
    httpMock = TestBed.inject(HttpTestingController);
    store = TestBed.inject(MockStore);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set and get filterBy$', (done) => {
    service.setFilterBy('testFilter');
    service.getFilterBy().subscribe((filterBy) => {
      expect(filterBy).toBe('testFilter');
      done();
    });
  });

  it('should set and get sortBy$', (done) => {
    const sortBy = { sortBy: 'views', sortByDirection: true };
    service.setSortBy(sortBy);
    service.getSortBy().subscribe((sort) => {
      expect(sort).toEqual(sortBy);
      done();
    });
  });

  it('should set and get searchValue$', (done) => {
    service.setSearchValue('testSearch');
    service.getSearchValue().subscribe((searchValue) => {
      expect(searchValue).toBe('testSearch');
      done();
    });
  });

  it('should fetch videos with search value', (done) => {
    const mockVideoSearchResponse: VideoSearchResponce = {
      items: [],
      nextPageToken: 'testToken',
      kind: '',
      etag: '',
      prevPageToken: '',
      pageInfo: {
        totalResults: 0,
        resultsPerPage: 0,
      },
    };
    service.getVideos({ searchValue: 'test' }).subscribe((response) => {
      expect(response).toEqual(mockVideoSearchResponse);
      done();
    });

    const req = httpMock.expectOne('search?type=video&maxResults=20&q=test');
    expect(req.request.method).toBe('GET');
    req.flush(mockVideoSearchResponse);
  });

  it('should dispatch addToFavorites action', () => {
    const dispatchSpy = jest.spyOn(store, 'dispatch');
    service.addToFavorites('testId');
    expect(dispatchSpy).toHaveBeenCalledWith(addToFavorites({ id: 'testId' }));
  });

  it('should dispatch removeFromFavorites action', () => {
    const dispatchSpy = jest.spyOn(store, 'dispatch');
    service.removeFromFavorites('testId');
    expect(dispatchSpy).toHaveBeenCalledWith(removeFromFavorites({ id: 'testId' }));
  });

  it('should dispatch removeCustomCard action', () => {
    const dispatchSpy = jest.spyOn(store, 'dispatch');
    service.removeCustomCard('testId');
    expect(dispatchSpy).toHaveBeenCalledWith(removeCustomCard({ id: 'testId' }));
  });

  it('should switch favorite status', () => {
    const removeFromFavoritesSpy = jest.spyOn(service, 'removeFromFavorites');
    const addToFavoritesSpy = jest.spyOn(service, 'addToFavorites');

    service.switchFavorite('testId', true);
    expect(removeFromFavoritesSpy).toHaveBeenCalledWith('testId');

    service.switchFavorite('testId', false);
    expect(addToFavoritesSpy).toHaveBeenCalledWith('testId');
  });
});
