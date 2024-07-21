import { AsyncPipe } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { Store } from '@ngrx/store';

import CustomLoaderComponent from '../../../shared/components/custom-loader/custom-loader.component';
import LoadingService from '../../../shared/services/loading.service';
import VideoData from '../../interfaces/video-data.interface';
import FilteringPipe from '../../pipes/filtering.pipe';
import SortingPipe from '../../pipes/sorting.pipe';
import VideoDataService from '../../services/video-data.service';
import VideoCardComponent from '../video-card/video-card.component';

@Component({
  selector: 'app-video-list',
  standalone: true,
  imports: [VideoCardComponent, CustomLoaderComponent, AsyncPipe, FilteringPipe, SortingPipe],
  providers: [FilteringPipe, SortingPipe],
  templateUrl: './video-list.component.html',
  styleUrl: './video-list.component.scss',
})
export default class VideoListComponent {
  videos = input<VideoData[] | null>([]);

  dataService = inject(VideoDataService);

  loadingService = inject(LoadingService);

  store = inject(Store);

  filteringPipe = inject(FilteringPipe);

  sortingPipe = inject(SortingPipe);
}
