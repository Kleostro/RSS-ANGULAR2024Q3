import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { BehaviorSubject, Observable, Subject, switchMap } from 'rxjs';

import ENVIRONMENTS from '../../../environment/environment';
import LoadingService from '../../shared/services/loading.service';
import VideoSearchResponce from '../interfaces/video-response.interface';
import Video from '../interfaces/video.interface';

@Injectable({
  providedIn: 'root',
})
export default class VideoDataService {
  loadingService = inject(LoadingService);

  httpClient = inject(HttpClient);

  videoData = new Subject<VideoSearchResponce>();

  filteredData = new BehaviorSubject<Video[]>([]);

  getData(value = ''): Observable<VideoSearchResponce> {
    this.httpClient
      .get<VideoSearchResponce>(`${ENVIRONMENTS.API_BASE_URL}search`, {
        params: {
          key: ENVIRONMENTS.API_KEY,
          type: 'video',
          maxResults: '3',
          q: value,
        },
      })
      .pipe(switchMap((data) => this.getVideoById(data.items.map(({ id }) => id.videoId).join(','))))
      .subscribe((data) => {
        this.filteredData.next(data.items);
        this.videoData.next(data);
      });

    return this.videoData.asObservable();
  }

  getVideoById(id: string): Observable<VideoSearchResponce> {
    return this.httpClient.get<VideoSearchResponce>(`${ENVIRONMENTS.API_BASE_URL}videos`, {
      params: {
        key: ENVIRONMENTS.API_KEY,
        id,
        part: 'snippet,statistics',
      },
    });
  }

  setFilteredData(data: Video[]) {
    this.filteredData.next(data);
  }
}
