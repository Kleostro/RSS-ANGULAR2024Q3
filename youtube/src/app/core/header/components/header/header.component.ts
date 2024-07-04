import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import CustomButtonComponent from '../../../../shared/custom-button/custom-button.component';
import VideoFilteringComponent from '../video-filtering/video-filtering.component';
import VideoSearchingComponent from '../video-searching/video-searching.component';
import { VideoSortingComponent } from '../video-sorting/video-sorting.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, VideoSearchingComponent, VideoFilteringComponent, VideoSortingComponent, CustomButtonComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export default class HeaderComponent {
  private isSettingsVisible = false;

  toggleVisibility() {
    this.isSettingsVisible = !this.isSettingsVisible;
  }

  get _isSettingsVisible() {
    return this.isSettingsVisible;
  }
}
