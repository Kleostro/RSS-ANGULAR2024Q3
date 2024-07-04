import { Component, Input, OnInit } from '@angular/core';

import CustomButtonComponent from '../../../../shared/custom-button/custom-button.component';
import { Video } from '../../models/video-search.model';
import { VideoDataService } from '../../servises/video-data.service';
import { SortingPipe } from './../../pipes/sorting.pipe';

@Component({
  selector: 'app-video-sorting',
  standalone: true,
  imports: [CustomButtonComponent],
  providers: [SortingPipe],
  templateUrl: './video-sorting.component.html',
  styleUrl: './video-sorting.component.scss',
})
export class VideoSortingComponent implements OnInit {
  @Input() videoData!: Video[];

  constructor(
    private sortingPipe: SortingPipe,
    private dataService: VideoDataService,
  ) {}

  ngOnInit(): void {
    this.dataService.filteringVideoData$.subscribe((data) => this.setVideoData(data));
  }

  setVideoData(videoData: Video[]) {
    this.videoData = videoData;
  }

  sortBy(type: string) {
    this.sortingPipe.transform(type, this.videoData);
  }
}
