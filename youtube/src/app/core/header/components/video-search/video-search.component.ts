import { NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import CustomButtonComponent from '../../../../shared/custom-button/custom-button.component';
import { Video } from '../../models/video-search.model';
import { FilteringPipe } from '../../pipes/filtering.pipe';
import { VideoDataService } from '../../servises/video-data.service';

@Component({
  selector: 'app-video-search',
  standalone: true,
  imports: [FormsModule, CustomButtonComponent, NgClass, ReactiveFormsModule],
  providers: [FilteringPipe],
  templateUrl: './video-search.component.html',
  styleUrl: './video-search.component.scss',
})
export default class VideoSearchComponent implements OnInit {
  public searchForm!: FormGroup;

  constructor(
    private dataService: VideoDataService,
    private formBuilder: FormBuilder,
    private filteringPipe: FilteringPipe,
  ) {}

  public ngOnInit() {
    this.searchForm = this.formBuilder.group({
      search: [null, Validators.required],
    });
  }

  public async submit(): Promise<Video[]> {
    if (!this.searchForm.value.search) {
      return [];
    }

    try {
      const data = await this.dataService.fetchVideoData();
      const filteredData = this.filteringPipe.transform(this.searchForm.value.search, data);
      this.dataService.updateVideoData(filteredData);
      this.dataService.filteringVideoData(filteredData);
      return filteredData;
    } catch {
      throw new Error('Uploading video failed!');
    }
  }
}
