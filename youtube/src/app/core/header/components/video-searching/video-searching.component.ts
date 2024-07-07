import { NgClass } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import CustomButtonComponent from '../../../../shared/components/custom-button/custom-button.component';
import VideoDataService from '../../../../youtube/services/video-data.service';
import Video from '../../interfaces/video.interface';
import FilteringPipe from '../../pipes/filtering.pipe';

@Component({
  selector: 'app-video-searching',
  standalone: true,
  imports: [FormsModule, CustomButtonComponent, NgClass, ReactiveFormsModule],
  providers: [FilteringPipe],
  templateUrl: './video-searching.component.html',
  styleUrl: './video-searching.component.scss',
})
export default class VideoSearchingComponent implements OnInit {
  private searchingForm!: FormGroup;

  private filteringPipe = inject(FilteringPipe);

  private dataService = inject(VideoDataService);

  private formBuilder = inject(FormBuilder);

  ngOnInit() {
    this.searchingForm = this.formBuilder.group({
      search: [null, Validators.required],
    });
  }

  public async submit(): Promise<Video[]> {
    if (!this.searchingForm.value.search) {
      return [];
    }

    try {
      const data = await this.dataService.fetchVideoData();
      const videoData = this.filteringPipe.transform(this.searchingForm.value.search, data);
      this.dataService.setOriginalVideoData(videoData);
      this.dataService.setUpdatedVideoData(videoData);
      return videoData;
    } catch {
      throw new Error('Uploading video failed!');
    }
  }

  getSearchingForm() {
    return this.searchingForm;
  }
}
