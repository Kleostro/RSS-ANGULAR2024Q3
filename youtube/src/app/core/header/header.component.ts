import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';
import { Store } from '@ngrx/store';

import LoginService from '../../auth/services/login.service';
import fadeInOut from '../../shared/animations/fadeInOut';
import CustomButtonComponent from '../../shared/components/custom-button/custom-button.component';
import CustomLinkComponent from '../../shared/components/custom-link/custom-link.component';
import MAT_ATTRIBUTE from '../../shared/constants/matAttribute';
import { selectFavoriteIds } from '../../store/selectors/videos.selector';
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
    MatBadgeModule,
  ],

  animations: [fadeInOut],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class HeaderComponent {
  localStorageService = inject(LocalStorageService);

  loginService = inject(LoginService);

  store = inject(Store);

  isSettingsVisible = signal(false);

  isLogin$ = this.loginService.getIsLogin();

  userName$ = this.loginService.getUserName();

  favoriteVideoCount$ = this.store.select(selectFavoriteIds);

  matAttribute = MAT_ATTRIBUTE;
}
