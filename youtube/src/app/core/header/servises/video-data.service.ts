import { Injectable } from '@angular/core';

import { BehaviorSubject, Subject } from 'rxjs';

import { Video, VideoSearchResponce } from '../models/video-search.model';

const VIDEO_DATA_URL =
  'https://raw.githubusercontent.com/rolling-scopes-school/tasks/master/tasks/angular/response.json';

@Injectable({
  providedIn: 'root',
})
export class VideoDataService {
  private updatedVideoDataSubject = new BehaviorSubject<Video[]>([]);
  private isLoadingSubject = new Subject<boolean>();
  private originalVideoDataSubject = new BehaviorSubject<Video[]>([]);

  updatedVideoData$ = this.updatedVideoDataSubject.asObservable();
  isLoading$ = this.isLoadingSubject.asObservable();
  originalVideoData$ = this.originalVideoDataSubject.asObservable();

  setUpdatedVideoData(data: Video[]) {
    this.updatedVideoDataSubject.next(data);
  }

  setOriginalVideoData(data: Video[]) {
    this.originalVideoDataSubject.next(data);
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
