import { Component, OnInit } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { Video } from '../../../core/header/models/video-search.model';
import LoadingService from '../../../core/header/services/loading.service';
import VideoDataService from '../../../core/header/services/video-data.service';
import VideoCardComponent from '../video-card/video-card.component';

@Component({
  selector: 'app-video-list',
  standalone: true,
  imports: [VideoCardComponent, MatProgressSpinnerModule],
  templateUrl: './video-list.component.html',
  styleUrl: './video-list.component.scss',
})
export default class VideoListComponent implements OnInit {
  private videoData!: Video[];

  private isLoading = false;

  constructor(
    private dataService: VideoDataService,
    private loadingService: LoadingService,
  ) {}

  ngOnInit(): void {
    this.dataService.updatedVideoData$.subscribe((data: Video[]) => this.setVideoData(data));
    this.loadingService.isLoading$.subscribe((isLoading: boolean) => this.setIsLoading(isLoading));
  }

  setIsLoading(isLoading: boolean) {
    this.isLoading = isLoading;
  }

  setVideoData(videoData: Video[]) {
    this.videoData = videoData;
  }

  getIsLoading(): boolean {
    return this.isLoading;
  }

  getVideoData() {
    return this.videoData;
  }
}
