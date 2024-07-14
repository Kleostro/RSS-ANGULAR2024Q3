import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { map } from 'rxjs';

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
  activateRoute = inject(ActivatedRoute);

  videoDataService = inject(VideoDataService);

  router = inject(Router);

  videoData$ = this.videoDataService.getVideoById(String(this.activateRoute.snapshot.paramMap.get('id'))).pipe(
    map((data) => {
      if (!data.items.length) {
        this.router.navigate(['/404']);
      }
      return data.items[0];
    }),
  );
}
