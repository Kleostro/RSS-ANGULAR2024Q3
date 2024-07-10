import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import Video from '../../interfaces/video.interface';
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
export default class VideoFilteringComponent implements OnInit, OnDestroy {
  formBuilder = inject(FormBuilder);

  dataService = inject(VideoDataService);

  filteringPipe = inject(FilteringPipe);

  filteringForm: FormGroup = this.formBuilder.group({
    filter: ['', Validators.required],
  });

  videoData$: Video[] = [];

  filterVideo() {
    const value = this.filteringForm.value.filter;
    if (value) {
      this.dataService.setFilteredData(this.filteringPipe.transform(value, this.videoData$));
    }
  }

  ngOnInit(): void {
    this.dataService.videoData.subscribe((data) => {
      this.videoData$ = data.items;
    });
  }

  ngOnDestroy(): void {
    this.dataService.videoData.unsubscribe();
  }
}
