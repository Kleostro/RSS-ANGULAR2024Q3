import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

import CustomButtonComponent from '../../../../shared/custom-button/custom-button.component';
import { Video } from '../../models/video-search.model';
import { VideoDataService } from '../../servises/video-data.service';
import VideoFilterComponent from '../video-filter/video-filter.component';
import VideoSearchComponent from '../video-search/video-search.component';
import { VideoSortingComponent } from '../video-sorting/video-sorting.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, VideoSearchComponent, VideoFilterComponent, VideoSortingComponent, CustomButtonComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export default class HeaderComponent implements OnInit {
  public isSettingsVisible = false;
  public videoData: Video[] = [];
  constructor(private dataService: VideoDataService) {}

  toggleVisibility() {
    this.isSettingsVisible = !this.isSettingsVisible;
    this.dataService.filteringVideoData(this.videoData);
  }

  ngOnInit(): void {
    this.dataService.updateVideoData$.subscribe((data) => this.setVideoData(data));
  }

  setVideoData(videoData: Video[]) {
    this.videoData = videoData;
  }
}
