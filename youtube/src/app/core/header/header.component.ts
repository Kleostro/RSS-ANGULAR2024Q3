import { AsyncPipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';

import LoginService from '../../auth/services/login.service';
import CustomButtonComponent from '../../shared/components/custom-button/custom-button.component';
import CustomLinkComponent from '../../shared/components/custom-link/custom-link.component';
import MAT_ATTRIBUTE from '../../shared/constants/matAttribute';
import VideoFilteringComponent from '../../youtube/components/video-filtering/video-filtering.component';
import VideoSearchingComponent from '../../youtube/components/video-searching/video-searching.component';
import VideoSortingComponent from '../../youtube/components/video-sorting/video-sorting.component';
import LocalStorageService from '../services/local-storage.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    VideoSearchingComponent,
    VideoFilteringComponent,
    VideoSortingComponent,
    CustomButtonComponent,
    CustomLinkComponent,
    AsyncPipe,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export default class HeaderComponent {
  localStorageService = inject(LocalStorageService);

  loginService = inject(LoginService);

  isSettingsVisible = signal(true);

  matAttribute = MAT_ATTRIBUTE;
}
