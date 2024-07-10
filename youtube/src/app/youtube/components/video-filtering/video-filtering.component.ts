import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import FilteringPipe from '../../pipes/filtering.pipe';
import VideoDataService from '../../services/video-data.service';

@Component({
  selector: 'app-video-filtering',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  providers: [FilteringPipe],
  templateUrl: './video-filtering.component.html',
  styleUrl: './video-filtering.component.scss',
})
export default class VideoFilteringComponent {
  formBuilder = inject(FormBuilder);

  dataService = inject(VideoDataService);

  filteringPipe = inject(FilteringPipe);

  filteringForm: FormGroup = this.formBuilder.group({
    filter: ['', Validators.required],
  });

  filterVideo() {
    this.dataService.setUpdatedVideoData(
      this.filteringPipe.transform(this.filteringForm.value.filter, this.dataService.originalVideoData.value),
    );
  }
}
