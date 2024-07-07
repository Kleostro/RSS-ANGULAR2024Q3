import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

type MatButtonType =
  | 'mat-button'
  | 'mat-raised-button'
  | 'mat-stroked-button'
  | 'mat-flat-button'
  | 'mat-icon-button'
  | 'mat-fab'
  | 'mat-mini-fab';

@Component({
  selector: 'app-custom-button',
  templateUrl: './custom-button.component.html',
  styleUrl: './custom-button.component.scss',
  imports: [MatButtonModule, MatIconModule],
  standalone: true,
})
export default class CustomButtonComponent {
  @Input() isDisabled = false;

  @Input() class = '';

  @Input() icon = '';

  @Input() matType: MatButtonType | null = null;
}
