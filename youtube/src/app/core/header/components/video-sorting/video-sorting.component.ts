import { NgClass } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';

import CustomButtonComponent from '../../../../shared/components/custom-button/custom-button.component';
import VideoDataService from '../../../../youtube/services/video-data.service';
import Video from '../../interfaces/video.interface';
import SortingPipe from '../../pipes/sorting.pipe';

@Component({
  selector: 'app-video-sorting',
  standalone: true,
  imports: [CustomButtonComponent, NgClass],
  providers: [SortingPipe],
  templateUrl: './video-sorting.component.html',
  styleUrl: './video-sorting.component.scss',
})
export default class VideoSortingComponent implements OnInit {
  private videoData!: Video[];

  private sortingPipe = inject(SortingPipe);

  private dataService = inject(VideoDataService);

  ngOnInit(): void {
    this.dataService.updatedVideoData$.subscribe((data: Video[]) => this.setVideoData(data));
  }

  setVideoData(videoData: Video[]) {
    this.videoData = videoData;
  }

  getVideoData(): Video[] {
    return this.videoData;
  }

  sortBy(type: string) {
    this.sortingPipe.transform(type, this.videoData);
  }
}
