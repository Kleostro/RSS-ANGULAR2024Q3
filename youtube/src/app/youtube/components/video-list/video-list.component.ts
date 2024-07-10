import { AsyncPipe } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';

import CustomLoaderComponent from '../../../shared/components/custom-loader/custom-loader.component';
import LoadingService from '../../../shared/services/loading.service';
import Video from '../../interfaces/video.interface';
import VideoDataService from '../../services/video-data.service';
import VideoCardComponent from '../video-card/video-card.component';

@Component({
  selector: 'app-video-list',
  standalone: true,
  imports: [VideoCardComponent, CustomLoaderComponent, AsyncPipe],
  templateUrl: './video-list.component.html',
  styleUrl: './video-list.component.scss',
})
export default class VideoListComponent implements OnInit, OnDestroy {
  dataService = inject(VideoDataService);

  loadingService = inject(LoadingService);

  videoData$: Video[] = [];

  ngOnInit(): void {
    this.dataService.filteredData.subscribe((data) => {
      this.videoData$ = data;
    });
  }

  ngOnDestroy(): void {
    this.dataService.filteredData.unsubscribe();
  }
}
