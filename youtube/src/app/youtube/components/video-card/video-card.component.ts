import { Component, Input, signal } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import CustomLinkComponent from '../../../shared/components/custom-link/custom-link.component';
import ChangeColorByDateDirective from '../../directives/changeColorByDate.directive';
import Video from '../../interfaces/video.interface';
import VideoStatisticsComponent from '../video-statistics/video-statistics.component';

@Component({
  selector: 'app-video-card',
  standalone: true,
  imports: [CustomLinkComponent, ChangeColorByDateDirective, MatProgressSpinnerModule, VideoStatisticsComponent],

  templateUrl: './video-card.component.html',
  styleUrl: './video-card.component.scss',
})
export default class VideoCardComponent {
  @Input() video!: Video;

  isImageLoading = signal(true);
}
