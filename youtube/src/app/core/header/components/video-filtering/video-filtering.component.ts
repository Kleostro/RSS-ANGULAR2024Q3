import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { Video } from '../../models/video-search.model';
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
  private videoData!: Video[];

  private filteringForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private dataService: VideoDataService,
    private filteringPipe: FilteringPipe,
  ) {}

  ngOnInit(): void {
    this.filteringForm = this.formBuilder.group({
      filter: [null, Validators.required],
    });

    this.dataService.originalVideoData$.subscribe((data) => {
      this.setVideoData(data);
      this.filteringForm.get('filter')?.setValue(null);
    });
  }

  filterVideo() {
    const filteredData = this.filteringPipe.transform(this.filteringForm.value.filter, this.videoData);
    this.dataService.setUpdatedVideoData(filteredData);
  }

  setVideoData(videoData: Video[]) {
    this.videoData = videoData;
  }

  getFilteringForm() {
    return this.filteringForm;
  }
}
