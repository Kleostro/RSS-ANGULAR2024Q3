import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { Store } from '@ngrx/store';

import CustomButtonComponent from '../../../shared/components/custom-button/custom-button.component';
import MAT_ATTRIBUTE from '../../../shared/constants/matAttribute';
import { searchVideos } from '../../../store/actions/videos.actions';
import VideoDataService from '../../services/video-data.service';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CustomButtonComponent, AsyncPipe],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PaginationComponent {
  pageTokens = input<{ prevPageToken: string | null; nextPageToken: string | null } | null>(null);

  store = inject(Store);

  videoDataService = inject(VideoDataService);

  searchValue$ = this.videoDataService.getSearchValue();

  matAttribute = MAT_ATTRIBUTE;

  moveToPageByToken(token: string | null) {
    if (token) {
      this.store.dispatch(searchVideos({ searchValue: this.searchValue$.value, pagination: token }));
      window.scroll(0, 0);
    }
  }
}
