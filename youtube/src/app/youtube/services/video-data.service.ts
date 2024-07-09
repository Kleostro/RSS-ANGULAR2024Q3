import { inject, Injectable, PipeTransform } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

import LoadingService from '../../shared/services/loading.service';
import VideoSearchResponce from '../interfaces/video-response.interface';
import Video from '../interfaces/video.interface';

@Injectable({
  providedIn: 'root',
})
export default class VideoDataService {
  loadingService = inject(LoadingService);

  updatedVideoDataSubject = new BehaviorSubject<Video[]>([]);

  originalVideoDataSubject = new BehaviorSubject<Video[]>([]);

  updatedVideoData$ = this.updatedVideoDataSubject.asObservable();

  originalVideoData$ = this.originalVideoDataSubject.asObservable();

  apiUrl = 'https://raw.githubusercontent.com/rolling-scopes-school/tasks/master/tasks/angular/response.json';

  setUpdatedVideoData(data: Video[]) {
    this.updatedVideoDataSubject.next(data);
  }

  setOriginalVideoData(data: Video[]) {
    this.originalVideoDataSubject.next(data);
  }

  async getVideoDataById(id: string): Promise<Video | null> {
    if (!this.updatedVideoDataSubject.value.length) {
      const data = await this.fetchVideoData();
      this.setOriginalVideoData(data);
      this.setUpdatedVideoData(data);
    }
    return this.updatedVideoDataSubject.value.find((video: Video) => video.id === id) || null;
  }

  async fetchVideoData(value: string = '', pipe: PipeTransform | null = null): Promise<Video[]> {
    this.loadingService.toggleLoading(true);
    try {
      const response = await fetch(this.apiUrl);
      const data: VideoSearchResponce = await response.json();
      const videoData = pipe?.transform(value, data.items);
      this.setOriginalVideoData(videoData);
      this.setUpdatedVideoData(videoData);
      return data.items;
    } catch {
      throw new Error('Uploading video failed!');
    } finally {
      this.loadingService.toggleLoading(false);
    }
  }
}
