import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';

import CustomLinkComponent from '../../../shared/components/custom-link/custom-link.component';
import MAT_ATTRIBUTE from '../../../shared/constants/matAttribute';
import { selectFavoriteVideos } from '../../../store/selectors/videos.selector';
import VideoListComponent from '../../components/video-list/video-list.component';

@Component({
  selector: 'app-favorite',
  standalone: true,
  imports: [VideoListComponent, AsyncPipe, CustomLinkComponent],
  templateUrl: './favorite.component.html',
  styleUrl: './favorite.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class FavoriteComponent {
  store = inject(Store);

  videos$ = this.store.select(selectFavoriteVideos);

  matAttribute = MAT_ATTRIBUTE;
}
