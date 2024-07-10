import { Component, Input, signal } from '@angular/core';

import CustomLinkComponent from '../../../shared/components/custom-link/custom-link.component';
import CustomLoaderComponent from '../../../shared/components/custom-loader/custom-loader.component';
import ChangeColorByDateDirective from '../../directives/changeColorByDate.directive';
import Video from '../../interfaces/video.interface';
import VideoStatisticsComponent from '../video-statistics/video-statistics.component';

@Component({
  selector: 'app-video-card',
  standalone: true,
  imports: [CustomLinkComponent, ChangeColorByDateDirective, CustomLoaderComponent, VideoStatisticsComponent],

  templateUrl: './video-card.component.html',
  styleUrl: './video-card.component.scss',
})
export default class VideoCardComponent {
  @Input() video!: Video;

  isImageLoading = signal(true);
}
