import { NgClass, TitleCasePipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

import LoginService from '../../../../auth/services/login.service';
import CustomButtonComponent from '../../../../shared/components/custom-button/custom-button.component';
import CustomLinkComponent from '../../../../shared/components/custom-link/custom-link.component';
import VideoFilteringComponent from '../../../../youtube/components/video-filtering/video-filtering.component';
import VideoSearchingComponent from '../../../../youtube/components/video-searching/video-searching.component';
import VideoSortingComponent from '../../../../youtube/components/video-sorting/video-sorting.component';
import LocalStorageService from '../../../services/local-storage.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink,
    VideoSearchingComponent,
    VideoFilteringComponent,
    VideoSortingComponent,
    CustomButtonComponent,
    CustomLinkComponent,
    NgClass,
    TitleCasePipe,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export default class HeaderComponent implements OnInit {
  public localStorageService = inject(LocalStorageService);

  public loginService = inject(LoginService);

  public isLogin = true;

  public isSettingsVisible = true;

  ngOnInit(): void {
    this.loginService.isLogin$.subscribe((val) => {
      this.isLogin = val;
    });
  }
}
