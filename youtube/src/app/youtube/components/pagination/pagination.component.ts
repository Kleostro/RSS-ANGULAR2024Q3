import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, Input, OnDestroy, OnInit, signal } from '@angular/core';
import { Store } from '@ngrx/store';

import { Observable, Subscription } from 'rxjs';

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
export default class PaginationComponent implements OnInit, OnDestroy {
  @Input() pageTokens$!: Observable<{ prevPageToken: string | null; nextPageToken: string | null } | null>;

  store = inject(Store);

  videoDataService = inject(VideoDataService);

  searchValue$ = this.videoDataService.getSearchValue();

  subsciption = new Subscription();

  matAttribute = MAT_ATTRIBUTE;

  currentPageIndex = 1;

  prevDisabled = signal(false);

  nextDisabled = signal(false);

  ngOnInit() {
    this.subsciption.add(
      this.pageTokens$.subscribe((pageTokens) => {
        this.prevDisabled.set(!pageTokens?.prevPageToken);
        this.nextDisabled.set(!pageTokens?.nextPageToken);
      }),
    );
  }

  ngOnDestroy() {
    this.subsciption.unsubscribe();
  }

  moveToPageByToken(token: string | null) {
    if (token) {
      this.prevDisabled.set(true);
      this.nextDisabled.set(true);
      this.store.dispatch(searchVideos({ searchValue: this.searchValue$.value, pagination: token }));
      window.scroll(0, 0);
    }
  }

  descendingPageIndex() {
    this.currentPageIndex -= 1;
  }

  ascendingPageIndex() {
    this.currentPageIndex += 1;
  }
}
