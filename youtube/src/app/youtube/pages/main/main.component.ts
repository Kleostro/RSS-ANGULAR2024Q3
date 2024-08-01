import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';

import CustomButtonComponent from '../../../shared/components/custom-button/custom-button.component';
import { selectPageTokens, selectVideos } from '../../../store/selectors/videos.selector';
import PaginationComponent from '../../components/pagination/pagination.component';
import VideoListComponent from '../../components/video-list/video-list.component';
import VideoDataService from '../../services/video-data.service';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [VideoListComponent, CustomButtonComponent, PaginationComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class MainComponent {
  store = inject(Store);

  videoDataService = inject(VideoDataService);

  videos = toSignal(this.store.select(selectVideos), { initialValue: null });

  pageTokens = toSignal(this.store.select(selectPageTokens), { initialValue: null });
}
