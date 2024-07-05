import { NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import CustomButtonComponent from '../../../../shared/components/custom-button/custom-button.component';
import { Video } from '../../models/video-search.model';
import SortingPipe from '../../pipes/sorting.pipe';
import VideoDataService from '../../services/video-data.service';

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

  constructor(
    private sortingPipe: SortingPipe,
    private dataService: VideoDataService,
  ) {}

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
