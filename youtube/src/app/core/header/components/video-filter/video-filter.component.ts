import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { Video } from '../../models/video-search.model';
import { FilteringPipe } from '../../pipes/filtering.pipe';
import { VideoDataService } from '../../servises/video-data.service';

@Component({
  selector: 'app-video-filter',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  providers: [FilteringPipe],
  templateUrl: './video-filter.component.html',
  styleUrl: './video-filter.component.scss',
})
export default class VideoFilterComponent implements OnInit {
  @Input() videoData!: Video[];
  public filterForm!: FormGroup;
  public filteredVideo: Video[] = [];
  constructor(
    private dataService: VideoDataService,
    private formBuilder: FormBuilder,
    private filteringPipe: FilteringPipe,
  ) {}

  ngOnInit(): void {
    this.filterForm = this.formBuilder.group({
      filter: [null, Validators.required],
    });

    this.dataService.updateVideoData$.subscribe(() => this.filterForm.controls['filter'].reset());
  }

  filterVideo() {
    this.filteredVideo = this.filteringPipe.transform(this.filterForm.value.filter, this.videoData);
    this.dataService.redrawVideoList(this.filteredVideo);
    this.dataService.filteringVideoData(this.filteredVideo);
  }
}
