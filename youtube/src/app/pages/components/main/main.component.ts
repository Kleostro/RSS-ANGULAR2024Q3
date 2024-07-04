import { Component } from '@angular/core';

import VideoListComponent from '../../../youtube/components/video-list/video-list.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [VideoListComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export default class MainComponent {}
