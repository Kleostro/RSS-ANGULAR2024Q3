import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

import ChangeColorByDateDirective from '../../../youtube/directives/changeColorByDate.directive';
import MAT_ATTRIBUTE from '../../constants/matAttribute';
import MatButtonType from '../../types/mat.type';

@Component({
  selector: 'app-custom-link',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, RouterLink, NgTemplateOutlet, ChangeColorByDateDirective],
  templateUrl: './custom-link.component.html',
  styleUrl: './custom-link.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CustomLinkComponent {
  @Input() class = '';

  @Input() icon = '';

  @Input() matType: MatButtonType | null = null;

  @Input() root = '';

  matAttrubute = MAT_ATTRIBUTE;
}
