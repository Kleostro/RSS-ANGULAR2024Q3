import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import VideoDetailedComponent from '../../components/video-detailed/video-detailed.component';
import Video from '../../interfaces/video.interface';
import VideoDataService from '../../services/video-data.service';

@Component({
  selector: 'app-detailed',
  standalone: true,
  imports: [VideoDetailedComponent],
  templateUrl: './detailed.component.html',
  styleUrl: './detailed.component.scss',
})
export default class DetailedComponent implements OnInit {
  activateRoute = inject(ActivatedRoute);

  videoDataService = inject(VideoDataService);

  videoData!: Video;

  router = inject(Router);

  ngOnInit(): void {
    const { id } = this.activateRoute.snapshot.params;
    this.videoDataService.getVideoDataById(id).then((data) => {
      if (data) {
        this.videoData = data;
      } else {
        this.router.navigate(['/404']);
      }
    });
  }
}
