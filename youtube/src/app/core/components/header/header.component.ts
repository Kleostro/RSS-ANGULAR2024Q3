import { Component } from '@angular/core'

import { VideoFilterComponent } from './../../../features/components/video-filter/video-filter.component'
import { VideoSearchComponent } from './../../../features/components/video-search/video-search.component'

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [VideoSearchComponent, VideoFilterComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {}
