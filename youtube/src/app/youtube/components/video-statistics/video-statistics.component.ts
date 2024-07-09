import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

import NumberCompositionPipe from '../../../shared/pipes/number-composition.pipe';

@Component({
  selector: 'app-video-statistics',
  standalone: true,
  imports: [NumberCompositionPipe, MatIconModule],
  templateUrl: './video-statistics.component.html',
  styleUrl: './video-statistics.component.scss',
})
export default class VideoStatisticsComponent {
  @Input() icon!: string;

  @Input() count!: string;
}
