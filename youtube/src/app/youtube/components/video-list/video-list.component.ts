import { Component, OnInit } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { Video } from '../../../core/header/models/video-search.model';
import { VideoDataService } from '../../../core/header/servises/video-data.service';
import VideoCardComponent from '../video-card/video-card.component';

@Component({
  selector: 'app-video-list',
  standalone: true,
  imports: [VideoCardComponent, MatProgressSpinnerModule],
  templateUrl: './video-list.component.html',
  styleUrl: './video-list.component.scss',
})
export default class VideoListComponent implements OnInit {
  constructor(private dataService: VideoDataService) {}
  videoData: Video[] = [];
  isLoading = false;

  ngOnInit(): void {
    this.dataService.updateVideoData$.subscribe((data) => this.setVideoData(data));
    this.dataService.redrawVideoList$.subscribe((data) => this.setVideoData(data));
    this.dataService.isLoading$.subscribe((isLoading) => this.setIsLoading(isLoading));
  }

  trackByVideoId(_: number, video: Video): string {
    return video.id;
  }

  setIsLoading(isLoading: boolean) {
    this.isLoading = isLoading;
  }

  setVideoData(videoData: Video[]) {
    this.videoData = videoData;
  }
}
