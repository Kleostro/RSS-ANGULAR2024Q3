import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { BehaviorSubject, Observable, switchMap } from 'rxjs';

import LoadingService from '../../shared/services/loading.service';
import VideoSearchResponce from '../interfaces/video-response.interface';
import Video from '../interfaces/video.interface';

@Injectable({
  providedIn: 'root',
})
export default class VideoDataService {
  loadingService = inject(LoadingService);

  httpClient = inject(HttpClient);

  private videoData$ = new BehaviorSubject<VideoSearchResponce | null>(null);

  private filteredData$ = new BehaviorSubject<Video[]>([]);

  getData(searchValue = ''): Observable<VideoSearchResponce | null> {
    this.httpClient
      .get<VideoSearchResponce>('search', {
        params: {
          type: 'video',
          maxResults: '100',
          q: searchValue,
        },
      })
      .pipe(switchMap((data) => this.getVideoById(data.items.map(({ id }) => id.videoId).join(','))))
      .subscribe((data) => {
        this.filteredData$.next(data.items);
        this.videoData$.next(data);
      });

    return this.videoData$.asObservable();
  }

  getVideoData(): BehaviorSubject<VideoSearchResponce | null> {
    return this.videoData$;
  }

  getFilteredData(): BehaviorSubject<Video[]> {
    return this.filteredData$;
  }

  getVideoById(id: string): Observable<VideoSearchResponce> {
    return this.httpClient.get<VideoSearchResponce>('videos', {
      params: {
        id,
        part: 'snippet,statistics',
      },
    });
  }

  setFilteredData(data: Video[]): Observable<Video[]> {
    this.filteredData$.next(data);
    return this.filteredData$.asObservable();
  }
}
