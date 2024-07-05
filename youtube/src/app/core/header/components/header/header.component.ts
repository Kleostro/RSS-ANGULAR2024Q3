import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import CustomButtonComponent from '../../../../shared/components/custom-button/custom-button.component';
import { ToggleVisibilityDirective } from '../../../../shared/directives/toggle-visibility.directive';
import { Video } from '../../models/video-search.model';
import VideoFilteringComponent from '../video-filtering/video-filtering.component';
import VideoSearchingComponent from '../video-searching/video-searching.component';
import { VideoSortingComponent } from '../video-sorting/video-sorting.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink,
    VideoSearchingComponent,
    VideoFilteringComponent,
    VideoSortingComponent,
    CustomButtonComponent,
    ToggleVisibilityDirective,
  ],
  providers: [ToggleVisibilityDirective],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export default class HeaderComponent {
  public isSettingsVisible = false;

  private videoData!: Video[];

  set _videoData(videoData: Video[]) {
    this.videoData = videoData;
  }

  get _videoData(): Video[] {
    return this.videoData;
  }
}
