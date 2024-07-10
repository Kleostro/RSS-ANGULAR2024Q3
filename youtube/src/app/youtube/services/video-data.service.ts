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

  updatedVideoData = new BehaviorSubject<Video[]>([]);

  originalVideoData = new BehaviorSubject<Video[]>([]);

  apiUrl = 'https://raw.githubusercontent.com/rolling-scopes-school/tasks/master/tasks/angular/response.json';

  setUpdatedVideoData(data: Video[]) {
    this.updatedVideoData.next(data);
  }

  setOriginalVideoData(data: Video[]) {
    this.originalVideoData.next(data);
  }

  async getVideoDataById(id: string): Promise<Video | null> {
    const data = this.updatedVideoData.value.length ? this.updatedVideoData.value : await this.fetchVideoData();
    return data.find((video: Video) => video.id === id) || null;
  }

  async fetchVideoData(value: string = '', pipe: PipeTransform | null = null): Promise<Video[]> {
    this.loadingService.toggleLoading(true);
    try {
      const response = await fetch(this.apiUrl);
      const data: VideoSearchResponce = await response.json();
      const videoData = pipe ? pipe.transform(value, data.items) : data.items;
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
