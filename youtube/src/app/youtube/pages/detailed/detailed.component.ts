import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import VideoDetailedComponent from '../../components/video-detailed/video-detailed.component';
import { VIDEO_PROVIDERS, VIDEO_TOKEN } from './detailed.providers';

@Component({
  selector: 'app-detailed',
  standalone: true,
  imports: [VideoDetailedComponent],
  templateUrl: './detailed.component.html',
  styleUrl: './detailed.component.scss',
  providers: [VIDEO_PROVIDERS],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class DetailedComponent {
  videoData = toSignal(inject(VIDEO_TOKEN), { initialValue: null });
}
