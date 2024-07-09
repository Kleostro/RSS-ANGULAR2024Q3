import { Component, inject, OnInit } from '@angular/core';
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
export default class VideoFilteringComponent implements OnInit {
  formBuilder = inject(FormBuilder);

  dataService = inject(VideoDataService);

  filteringPipe = inject(FilteringPipe);

  videoData: Video[] = [];

  filteringForm: FormGroup = this.formBuilder.group({
    filter: [null, Validators.required],
  });

  ngOnInit(): void {
    this.dataService.originalVideoData$.subscribe((data) => {
      this.videoData = data;
    });
  }

  filterVideo() {
    const filteredData = this.filteringPipe.transform(this.filteringForm.value.filter, this.videoData);
    this.dataService.setUpdatedVideoData(filteredData);
  }
}
