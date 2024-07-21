import { AsyncPipe, DatePipe, NgIf } from '@angular/common';
import { Component, inject, input, signal } from '@angular/core';
import { Store } from '@ngrx/store';

import { map } from 'rxjs';

import CustomButtonComponent from '../../../shared/components/custom-button/custom-button.component';
import CustomLinkComponent from '../../../shared/components/custom-link/custom-link.component';
import CustomLoaderComponent from '../../../shared/components/custom-loader/custom-loader.component';
import MAT_ATTRIBUTE from '../../../shared/constants/matAttribute';
import { selectFavoriteIds } from '../../../store/selectors/videos.selector';
import ChangeColorByDateDirective from '../../directives/changeColorByDate.directive';
import VideoData from '../../interfaces/video-data.interface';
import VideoDataService from '../../services/video-data.service';
import VideoStatisticsComponent from '../video-statistics/video-statistics.component';

@Component({
  selector: 'app-video-detailed',
  standalone: true,
  imports: [
    DatePipe,
    CustomLinkComponent,
    ChangeColorByDateDirective,
    VideoStatisticsComponent,
    AsyncPipe,
    CustomLoaderComponent,
    CustomButtonComponent,
    NgIf,
  ],
  templateUrl: './video-detailed.component.html',
  styleUrl: './video-detailed.component.scss',
})
export default class VideoDetailedComponent {
  videoData = input<VideoData | null>(null);

  dataService = inject(VideoDataService);

  isImageLoading = signal(true);

  store = inject(Store);

  matAttribute = MAT_ATTRIBUTE;

  hasFavorite$ = this.store
    .select(selectFavoriteIds)
    .pipe(map((favoritesIds) => favoritesIds.includes(this.videoData()?.video.id ?? '')));

  handleFailedImg(event: Event) {
    const target = event.target as HTMLImageElement;
    target.src = '../img/png/placeholder.png';
  }
}
