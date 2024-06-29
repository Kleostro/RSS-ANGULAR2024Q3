import { Component } from '@angular/core'

import { VideoListComponent } from '../../../widgets/components/video-list/video-list.component'

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [VideoListComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent {}
