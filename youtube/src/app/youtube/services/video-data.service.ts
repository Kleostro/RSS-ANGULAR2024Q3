import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { BehaviorSubject, Observable, of, switchMap, tap } from 'rxjs';

import LoadingService from '../../shared/services/loading.service';
import { addToFavorites, removeCustomCard, removeFromFavorites } from '../../store/actions/videos.actions';
import { selectVideoById } from '../../store/selectors/videos.selector';
import VideoData from '../interfaces/video-data.interface';
import VideoSearchResponce, { VideoResponce } from '../interfaces/video-response.interface';

@Injectable({
  providedIn: 'root',
})
export default class VideoDataService {
  loadingService = inject(LoadingService);

  httpClient = inject(HttpClient);

  store = inject(Store);

  router = inject(Router);

  private filterBy$ = new BehaviorSubject('');

  private sortBy$ = new BehaviorSubject<{ sortBy: string; sortByDirection: boolean } | null>(null);

  private searchValue$ = new BehaviorSubject('');

  getFilterBy() {
    return this.filterBy$;
  }

  setFilterBy(filterBy: string) {
    this.filterBy$.next(filterBy);
    return this.filterBy$;
  }

  getSortBy() {
    return this.sortBy$;
  }

  setSortBy(sortBy: { sortBy: string; sortByDirection: boolean }) {
    this.sortBy$.next(sortBy);
    return this.sortBy$;
  }

  getSearchValue() {
    return this.searchValue$;
  }

  setSearchValue(searchValue: string) {
    this.searchValue$.next(searchValue);
    return this.searchValue$;
  }

  getVideoById(id: string): Observable<VideoData> {
    return this.getHTTPVideoById(id).pipe(
      switchMap((data) => {
        if (!data.items.length) {
          return this.store.select(selectVideoById(id)).pipe(
            tap((video) => {
              if (!video) {
                this.router.navigate(['/404']);
              }
            }),
          );
        }
        return of({ video: data.items[0], isCustom: false });
      }),
    );
  }

  getVideos(params: { searchValue: string; pagination?: string }): Observable<VideoSearchResponce> {
    const reqParams = {
      type: 'video',
      maxResults: '20',
      q: params.searchValue,
    };
    this.setSearchValue(params.searchValue);
    return this.httpClient.get<VideoSearchResponce>('search', {
      params: params.pagination ? { ...reqParams, pageToken: params.pagination } : reqParams,
    });
  }

  getHTTPVideoById(id: string): Observable<VideoResponce> {
    return this.httpClient.get<VideoResponce>('videos', {
      params: {
        id,
        part: 'snippet,statistics',
      },
    });
  }

  removeCustomCard(id: string) {
    this.store.dispatch(removeCustomCard({ id }));
    this.router.navigate(['/main']);
  }

  addToFavorites(id: string) {
    this.store.dispatch(addToFavorites({ id }));
  }

  removeFromFavorites(id: string) {
    this.store.dispatch(removeFromFavorites({ id }));
  }

  switchFavorite(id: string, isFavorite: boolean) {
    if (isFavorite) {
      this.removeFromFavorites(id);
    } else {
      this.addToFavorites(id);
    }
  }
}
