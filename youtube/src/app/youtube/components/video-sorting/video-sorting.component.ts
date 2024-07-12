import { Component, inject } from '@angular/core';

import CustomButtonComponent from '../../../shared/components/custom-button/custom-button.component';
import MAT_ATTRIBUTE from '../../../shared/constants/matAttribute';
import SortingPipe from '../../pipes/sorting.pipe';
import VideoDataService from '../../services/video-data.service';

@Component({
  selector: 'app-video-sorting',
  standalone: true,
  imports: [CustomButtonComponent],
  providers: [SortingPipe],
  templateUrl: './video-sorting.component.html',
  styleUrl: './video-sorting.component.scss',
})
export default class VideoSortingComponent {
  sortingPipe = inject(SortingPipe);

  dataService = inject(VideoDataService);

  matAttribute = MAT_ATTRIBUTE;

  sortBy(type: string) {
    this.sortingPipe.transform(type, this.dataService.filteredData.value);
  }
}
