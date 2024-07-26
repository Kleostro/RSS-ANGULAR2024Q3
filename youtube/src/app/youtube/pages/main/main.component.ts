import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';

import CustomButtonComponent from '../../../shared/components/custom-button/custom-button.component';
import { selectPageTokens, selectVideos } from '../../../store/selectors/videos.selector';
import PaginationComponent from '../../components/pagination/pagination.component';
import VideoListComponent from '../../components/video-list/video-list.component';
import VideoDataService from '../../services/video-data.service';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [VideoListComponent, AsyncPipe, CustomButtonComponent, PaginationComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class MainComponent {
  store = inject(Store);

  videoDataService = inject(VideoDataService);

  videos$ = this.store.select(selectVideos);

  pageTokens$ = this.store.select(selectPageTokens);
}
