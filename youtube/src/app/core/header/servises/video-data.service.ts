import { Injectable } from '@angular/core';

import { BehaviorSubject, Subject } from 'rxjs';

import { Video, VideoSearchResponce } from '../models/video-search.model';

const VIDEO_DATA_URL =
  'https://raw.githubusercontent.com/rolling-scopes-school/tasks/master/tasks/angular/response.json';

@Injectable({
  providedIn: 'root',
})
export class VideoDataService {
  private updateVideoDataSubject = new BehaviorSubject<Video[]>([]);
  updateVideoData$ = this.updateVideoDataSubject.asObservable();

  private isLoadingSubject = new Subject<boolean>();
  isLoading$ = this.isLoadingSubject.asObservable();

  updateVideoData(data: Video[]) {
    this.updateVideoDataSubject.next(data);
  }

  setIsLoading(isLoading: boolean) {
    this.isLoadingSubject.next(isLoading);
  }

  async fetchVideoData(): Promise<Video[]> {
    this.setIsLoading(true);
    const response = await fetch(VIDEO_DATA_URL);
    const data: VideoSearchResponce = await response.json();
    this.setIsLoading(false);
    return data.items;
  }
}
