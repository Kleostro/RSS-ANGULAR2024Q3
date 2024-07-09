import { DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';

import CustomLinkComponent from '../../../shared/components/custom-link/custom-link.component';
import ChangeColorByDateDirective from '../../directives/changeColorByDate.directive';
import Video from '../../interfaces/video.interface';
import VideoStatisticsComponent from '../video-statistics/video-statistics.component';

@Component({
  selector: 'app-video-detailed',
  standalone: true,
  imports: [DatePipe, CustomLinkComponent, ChangeColorByDateDirective, VideoStatisticsComponent],
  templateUrl: './video-detailed.component.html',
  styleUrl: './video-detailed.component.scss',
})
export default class VideoDetailedComponent {
  @Input() video!: Video;
}
