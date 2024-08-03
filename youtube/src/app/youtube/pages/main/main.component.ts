import { ChangeDetectionStrategy, Component, inject, OnDestroy, OnInit } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';

import { Subscription } from 'rxjs';

import CustomButtonComponent from '../../../shared/components/custom-button/custom-button.component';
import { searchVideos } from '../../../store/actions/videos.actions';
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
export default class MainComponent implements OnInit, OnDestroy {
  store = inject(Store);

  videoDataService = inject(VideoDataService);

  videos = toSignal(this.store.select(selectVideos), { initialValue: null });

  pageTokens = toSignal(this.store.select(selectPageTokens), { initialValue: null });

  searchValue = toSignal(this.videoDataService.getSearchValue(), { initialValue: '' });

  isLoading = true;

  subsciption = new Subscription();

  handleTokenChange(token: string) {
    this.isLoading = true;
    this.store.dispatch(searchVideos({ searchValue: this.searchValue(), pagination: token }));
    window.scroll(0, 0);
  }

  ngOnInit() {
    this.subsciption.add(
      this.store.select(selectVideos).subscribe(() => {
        this.isLoading = false;
      }),
    );
  }

  ngOnDestroy() {
    this.subsciption.unsubscribe();
  }
}
