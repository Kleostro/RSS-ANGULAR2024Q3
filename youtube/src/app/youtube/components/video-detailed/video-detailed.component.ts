import { AsyncPipe, DatePipe } from '@angular/common';
import { Component, Input, signal } from '@angular/core';

import CustomLinkComponent from '../../../shared/components/custom-link/custom-link.component';
import CustomLoaderComponent from '../../../shared/components/custom-loader/custom-loader.component';
import ChangeColorByDateDirective from '../../directives/changeColorByDate.directive';
import Video from '../../interfaces/video.interface';
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
  ],
  templateUrl: './video-detailed.component.html',
  styleUrl: './video-detailed.component.scss',
})
export default class VideoDetailedComponent {
  @Input() video: Video | null = null;

  isImageLoading = signal(true);
}
