import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { Video } from '../../models/video-search.model';
import { FilteringPipe } from '../../pipes/filtering.pipe';
import { VideoDataService } from '../../services/video-data.service';

@Component({
  selector: 'app-video-filter',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  providers: [FilteringPipe],
  templateUrl: './video-filter.component.html',
  styleUrl: './video-filter.component.scss',
})
export default class VideoFilterComponent implements OnInit {
  private videoData!: Video[];
  private filterForm!: FormGroup;
  constructor(
    private dataService: VideoDataService,
    private formBuilder: FormBuilder,
    private filteringPipe: FilteringPipe,
  ) {}

  ngOnInit(): void {
    this.filterForm = this.formBuilder.group({
      filter: [null, Validators.required],
    });

    this.dataService.updateVideoData$.subscribe((data) => (this._videoData = data));
  }

  filterVideo() {
    this.videoData = this.filteringPipe.transform(this.filterForm.value.filter, this.videoData);
    this.dataService.updateVideoData(this.videoData);
  }

  set _videoData(videoData: Video[]) {
    this.videoData = videoData;
  }

  get _filterForm() {
    return this.filterForm;
  }
}
