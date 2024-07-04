import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

import { Video } from '../../../core/header/models/video-search.model';
import CustomButtonComponent from '../../../shared/custom-button/custom-button.component';
import { BorderColorDirective } from '../../directives/border-color.directive';

@Component({
  selector: 'app-video-card',
  standalone: true,
  imports: [CustomButtonComponent, MatIconModule, BorderColorDirective],
  providers: [BorderColorDirective],
  templateUrl: './video-card.component.html',
  styleUrl: './video-card.component.scss',
})
export default class VideoCardComponent {
  constructor() {}
  @Input() video!: Video;
}
