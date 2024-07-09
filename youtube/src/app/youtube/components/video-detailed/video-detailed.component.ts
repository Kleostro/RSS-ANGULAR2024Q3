import { DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

import CustomLinkComponent from '../../../shared/components/custom-link/custom-link.component';
import NumberCompositionPipe from '../../../shared/pipes/number-composition.pipe';
import ChangeColorByDateDirective from '../../directives/changeColorByDate.directive';
import Video from '../../interfaces/video.interface';

@Component({
  selector: 'app-video-detailed',
  standalone: true,
  imports: [DatePipe, NumberCompositionPipe, MatIcon, CustomLinkComponent, ChangeColorByDateDirective],
  templateUrl: './video-detailed.component.html',
  styleUrl: './video-detailed.component.scss',
})
export default class VideoDetailedComponent {
  @Input() video!: Video;
}
