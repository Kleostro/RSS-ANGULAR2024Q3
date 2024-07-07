import { DatePipe } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { Router } from '@angular/router';

import Video from '../../../core/header/interfaces/video.interface';
import CustomLinkComponent from '../../../shared/components/custom-link/custom-link.component';
import NumberCompositionPipe from '../../../shared/pipes/number-composition.pipe';
import BorderColorDirective from '../../directives/border-color.directive';

@Component({
  selector: 'app-video-detailed',
  standalone: true,
  imports: [DatePipe, NumberCompositionPipe, MatIcon, CustomLinkComponent, BorderColorDirective],
  templateUrl: './video-detailed.component.html',
  styleUrl: './video-detailed.component.scss',
})
export default class VideoDetailedComponent {
  @Input() video!: Video;

  router = inject(Router);
}
