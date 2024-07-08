import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import VideoDetailedComponent from '../../../components/video-detailed/video-detailed.component';
import Video from '../../../interfaces/video.interface';
import VideoDataService from '../../../services/video-data.service';

@Component({
  selector: 'app-detailed',
  standalone: true,
  imports: [VideoDetailedComponent],
  templateUrl: './detailed.component.html',
  styleUrl: './detailed.component.scss',
})
export default class DetailedComponent implements OnInit {
  private activateRoute = inject(ActivatedRoute);

  private videoDataService = inject(VideoDataService);

  videoData!: Video;

  ngOnInit(): void {
    const { id } = this.activateRoute.snapshot.params;
    this.videoDataService.getVideoDataById(id).then((data) => {
      if (data) {
        this.videoData = data;
      }
    });
  }
}
