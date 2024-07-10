import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import LoadingService from '../../../shared/services/loading.service';
import VideoDataService from '../../services/video-data.service';
import VideoCardComponent from '../video-card/video-card.component';

@Component({
  selector: 'app-video-list',
  standalone: true,
  imports: [VideoCardComponent, MatProgressSpinnerModule, AsyncPipe],
  templateUrl: './video-list.component.html',
  styleUrl: './video-list.component.scss',
})
export default class VideoListComponent {
  dataService = inject(VideoDataService);

  loadingService = inject(LoadingService);
}
