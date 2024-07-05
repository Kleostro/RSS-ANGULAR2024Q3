import { Component, OnInit } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { Video } from '../../../core/header/models/video-search.model';
import { LoadingService } from '../../../core/header/services/loading.service';
import { VideoDataService } from '../../../core/header/services/video-data.service';
import VideoCardComponent from '../video-card/video-card.component';

@Component({
  selector: 'app-video-list',
  standalone: true,
  imports: [VideoCardComponent, MatProgressSpinnerModule],
  templateUrl: './video-list.component.html',
  styleUrl: './video-list.component.scss',
})
export default class VideoListComponent implements OnInit {
  constructor(
    private dataService: VideoDataService,
    private loadingService: LoadingService,
  ) {}
  private videoData!: Video[];
  private isLoading = false;

  ngOnInit(): void {
    this.dataService.updatedVideoData$.subscribe((data) => (this._videoData = data));
    this.loadingService.isLoading$.subscribe((isLoading) => (this._isLoading = isLoading));
  }

  set _isLoading(isLoading: boolean) {
    this.isLoading = isLoading;
  }

  set _videoData(videoData: Video[]) {
    this.videoData = videoData;
  }

  get _isLoading() {
    return this.isLoading;
  }

  get _videoData() {
    return this.videoData;
  }
}
