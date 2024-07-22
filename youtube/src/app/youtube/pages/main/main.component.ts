import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';

import { selectVideos } from '../../../store/selectors/videos.selector';
import VideoListComponent from '../../components/video-list/video-list.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [VideoListComponent, AsyncPipe],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class MainComponent {
  store = inject(Store);

  videos$ = this.store.select(selectVideos);
}
