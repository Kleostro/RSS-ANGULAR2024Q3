import { NgClass } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';

import CustomButtonComponent from '../../../shared/components/custom-button/custom-button.component';
import NumberCompositionPipe from '../../../shared/pipes/number-composition.pipe';
import BorderColorDirective from '../../directives/border-color.directive';
import Video from '../../interfaces/video.interface';

@Component({
  selector: 'app-video-card',
  standalone: true,
  imports: [
    CustomButtonComponent,
    MatIconModule,
    BorderColorDirective,
    MatProgressSpinnerModule,
    NgClass,
    NumberCompositionPipe,
  ],
  providers: [BorderColorDirective],
  templateUrl: './video-card.component.html',
  styleUrl: './video-card.component.scss',
})
export default class VideoCardComponent {
  @Input() video!: Video;

  private router = inject(Router);

  isImageLoading = true;

  goToDetailedPage() {
    this.router.navigate([`/detailed/${this.video.id}`]);
  }
}
