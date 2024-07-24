import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import VideoDetailedComponent from '../../components/video-detailed/video-detailed.component';
import { VIDEO_PROVIDERS, VIDEO_TOKEN } from './detailed.providers';

@Component({
  selector: 'app-detailed',
  standalone: true,
  imports: [VideoDetailedComponent, AsyncPipe],
  templateUrl: './detailed.component.html',
  styleUrl: './detailed.component.scss',
  providers: [VIDEO_PROVIDERS],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class DetailedComponent {
  videoData$ = inject(VIDEO_TOKEN);
}
