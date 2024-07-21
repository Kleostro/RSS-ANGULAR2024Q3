import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import VideoDetailedComponent from '../../components/video-detailed/video-detailed.component';
import VideoDataService from '../../services/video-data.service';

@Component({
  selector: 'app-detailed',
  standalone: true,
  imports: [VideoDetailedComponent, AsyncPipe],
  templateUrl: './detailed.component.html',
  styleUrl: './detailed.component.scss',
})
export default class DetailedComponent {
  videoDataService = inject(VideoDataService);

  activatedRoute = inject(ActivatedRoute);

  videoData$ = this.videoDataService.getVideoById(this.activatedRoute.snapshot.paramMap.get('id') ?? '');
}
