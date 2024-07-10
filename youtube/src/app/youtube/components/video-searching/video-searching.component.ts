import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import CustomButtonComponent from '../../../shared/components/custom-button/custom-button.component';
import FilteringPipe from '../../pipes/filtering.pipe';
import VideoDataService from '../../services/video-data.service';

@Component({
  selector: 'app-video-searching',
  standalone: true,
  imports: [FormsModule, CustomButtonComponent, ReactiveFormsModule],
  providers: [FilteringPipe],
  templateUrl: './video-searching.component.html',
  styleUrl: './video-searching.component.scss',
})
export default class VideoSearchingComponent {
  dataService = inject(VideoDataService);

  filteringPipe = inject(FilteringPipe);

  formBuilder = inject(FormBuilder);

  searchingForm = this.formBuilder.group({
    search: ['', Validators.required],
  });

  submit(): void {
    const searchResult = this.searchingForm.value.search;
    if (searchResult) {
      this.dataService.fetchVideoData(searchResult, this.filteringPipe);
    }
  }
}
