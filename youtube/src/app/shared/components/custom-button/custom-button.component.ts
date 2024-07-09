import { NgTemplateOutlet } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import MatButtonType from './types/mat.type';

@Component({
  selector: 'app-custom-button',
  templateUrl: './custom-button.component.html',
  styleUrl: './custom-button.component.scss',
  imports: [MatButtonModule, MatIconModule, NgTemplateOutlet],
  standalone: true,
})
export default class CustomButtonComponent {
  @Input() isDisabled = false;

  @Input() class = '';

  @Input() icon = '';

  @Input() matType: MatButtonType | null = null;
}
