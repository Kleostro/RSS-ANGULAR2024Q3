import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

import { Video, VideoSearchResponce } from '../models/video-search.model';
import { LoadingService } from './loading.service';

const VIDEO_DATA_URL =
  'https://raw.githubusercontent.com/rolling-scopes-school/tasks/master/tasks/angular/response.json';

@Injectable({
  providedIn: 'root',
})
export class VideoDataService {
  private updatedVideoDataSubject = new BehaviorSubject<Video[]>([]);
  private originalVideoDataSubject = new BehaviorSubject<Video[]>([]);

  updatedVideoData$ = this.updatedVideoDataSubject.asObservable();
  originalVideoData$ = this.originalVideoDataSubject.asObservable();

  constructor(private loadingService: LoadingService) {}

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
