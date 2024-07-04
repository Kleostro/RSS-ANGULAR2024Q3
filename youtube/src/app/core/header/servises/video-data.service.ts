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

  private redrawVideoListSubject = new Subject<Video[]>();
  redrawVideoList$ = this.redrawVideoListSubject.asObservable();

  private filteringVideoDataSubject = new BehaviorSubject<Video[]>([]);
  filteringVideoData$ = this.filteringVideoDataSubject.asObservable();

  private isLoadingSubject = new BehaviorSubject<boolean>(false);
  isLoading$ = this.isLoadingSubject.asObservable();

  updateVideoData(data: Video[]) {
    this.updateVideoDataSubject.next(data);
  }

  filteringVideoData(data: Video[]) {
    this.filteringVideoDataSubject.next(data);
  }

  redrawVideoList(data: Video[]) {
    this.redrawVideoListSubject.next(data);
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
