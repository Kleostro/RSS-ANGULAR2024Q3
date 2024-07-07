import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import Video from '../../../../core/header/interfaces/video.interface';
import VideoDataService from '../../../../core/services/video-data.service';
import VideoDetailedComponent from '../../../components/video-detailed/video-detailed.component';

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

  videoData: Video | null = null;

  ngOnInit(): void {
    const { id } = this.activateRoute.snapshot.params;
    this.videoDataService.getVideoDataById(id).then((data) => {
      this.videoData = data;
    });
  }
}
