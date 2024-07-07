import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

import BackgroundColorDirective from '../../../youtube/directives/background-color.directive';
import MatButtonType from '../custom-button/types/mat.type';

@Component({
  selector: 'app-custom-link',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, RouterLink, BackgroundColorDirective],
  templateUrl: './custom-link.component.html',
  styleUrl: './custom-link.component.scss',
})
export default class CustomLinkComponent {
  @Input() class = '';

  @Input() icon = '';

  @Input() matType: MatButtonType | null = null;

  @Input() root = '';

  @Input() publishedAt!: string;
}
