import { Component, inject, OnInit } from '@angular/core';

import CustomButtonComponent from '../../../shared/components/custom-button/custom-button.component';
import Video from '../../interfaces/video.interface';
import SortingPipe from '../../pipes/sorting.pipe';
import VideoDataService from '../../services/video-data.service';

@Component({
  selector: 'app-video-sorting',
  standalone: true,
  imports: [CustomButtonComponent],
  providers: [SortingPipe],
  templateUrl: './video-sorting.component.html',
  styleUrl: './video-sorting.component.scss',
})
export default class VideoSortingComponent implements OnInit {
  sortingPipe = inject(SortingPipe);

  dataService = inject(VideoDataService);

  videoData: Video[] = [];

  ngOnInit(): void {
    this.dataService.updatedVideoData$.subscribe((data: Video[]) => {
      this.videoData = data;
    });
  }

  sortBy(type: string) {
    this.sortingPipe.transform(type, this.videoData);
  }
}
