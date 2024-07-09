import { Component, inject, signal } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import LoadingService from '../../../shared/services/loading.service';
import Video from '../../interfaces/video.interface';
import VideoDataService from '../../services/video-data.service';
import VideoCardComponent from '../video-card/video-card.component';

@Component({
  selector: 'app-video-list',
  standalone: true,
  imports: [VideoCardComponent, MatProgressSpinnerModule],
  templateUrl: './video-list.component.html',
  styleUrl: './video-list.component.scss',
})
export default class VideoListComponent {
  videoData: Video[] = [];

  isLoading = signal(false);

  dataService = inject(VideoDataService);

  loadingService = inject(LoadingService);

  constructor() {
    this.dataService.updatedVideoData$.subscribe((data: Video[]) => {
      this.videoData = data;
    });
    this.loadingService.isLoading.subscribe((isLoading: boolean) => this.isLoading.set(isLoading));
  }
}
