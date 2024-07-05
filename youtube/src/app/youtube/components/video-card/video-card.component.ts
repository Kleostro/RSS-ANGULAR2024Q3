import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { Video } from '../../../core/header/models/video-search.model';
import CustomButtonComponent from '../../../shared/components/custom-button/custom-button.component';
import BorderColorDirective from '../../directives/border-color.directive';

@Component({
  selector: 'app-video-card',
  standalone: true,
  imports: [CustomButtonComponent, MatIconModule, BorderColorDirective, MatProgressSpinnerModule, NgClass],
  providers: [BorderColorDirective],
  templateUrl: './video-card.component.html',
  styleUrl: './video-card.component.scss',
})
export default class VideoCardComponent {
  @Input() video!: Video;

  isImageLoading = true;

  imageLoaded() {
    this.isImageLoading = false;
  }
}
