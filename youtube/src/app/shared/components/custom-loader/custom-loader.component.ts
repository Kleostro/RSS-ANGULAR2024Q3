import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-custom-loader',
  standalone: true,
  imports: [MatProgressSpinnerModule],
  templateUrl: './custom-loader.component.html',
  styleUrl: './custom-loader.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CustomLoaderComponent {
  @Input() mode: 'determinate' | 'indeterminate' = 'indeterminate';

  @Input() hidden = false;
}
