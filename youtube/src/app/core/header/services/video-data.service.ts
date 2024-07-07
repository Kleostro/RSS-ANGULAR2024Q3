import { inject, Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

import VideoSearchResponce from '../interfaces/video-response.interface';
import Video from '../interfaces/video.interface';
import LoadingService from './loading.service';

const VIDEO_DATA_URL =
  'https://raw.githubusercontent.com/rolling-scopes-school/tasks/master/tasks/angular/response.json';

@Injectable({
  providedIn: 'root',
})
export default class VideoDataService {
  private updatedVideoDataSubject = new BehaviorSubject<Video[]>([]);

  private originalVideoDataSubject = new BehaviorSubject<Video[]>([]);

  private loadingService = inject(LoadingService);

  updatedVideoData$ = this.updatedVideoDataSubject.asObservable();

  originalVideoData$ = this.originalVideoDataSubject.asObservable();

  setUpdatedVideoData(data: Video[]) {
    this.updatedVideoDataSubject.next(data);
  }

  setOriginalVideoData(data: Video[]) {
    this.originalVideoDataSubject.next(data);
  }

  async fetchVideoData(): Promise<Video[]> {
    this.loadingService.toggleLoading(true);
    try {
      const response = await fetch(VIDEO_DATA_URL);
      const data: VideoSearchResponce = await response.json();
      return data.items;
    } catch {
      throw new Error('Uploading video failed!');
    } finally {
      this.loadingService.toggleLoading(false);
    }
  }
}
