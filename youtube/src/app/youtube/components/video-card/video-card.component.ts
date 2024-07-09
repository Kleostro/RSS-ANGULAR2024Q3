import { Component, Input, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import CustomLinkComponent from '../../../shared/components/custom-link/custom-link.component';
import NumberCompositionPipe from '../../../shared/pipes/number-composition.pipe';
import ChangeColorByDateDirective from '../../directives/changeColorByDate.directive';
import Video from '../../interfaces/video.interface';

@Component({
  selector: 'app-video-card',
  standalone: true,
  imports: [
    CustomLinkComponent,
    MatIconModule,
    ChangeColorByDateDirective,
    MatProgressSpinnerModule,
    NumberCompositionPipe,
  ],

  templateUrl: './video-card.component.html',
  styleUrl: './video-card.component.scss',
})
export default class VideoCardComponent {
  @Input() video!: Video;

  isImageLoading = signal(true);
}
