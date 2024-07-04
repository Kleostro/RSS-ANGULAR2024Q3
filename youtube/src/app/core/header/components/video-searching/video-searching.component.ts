import { NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import CustomButtonComponent from '../../../../shared/components/custom-button/custom-button.component';
import { Video } from '../../models/video-search.model';
import { FilteringPipe } from '../../pipes/filtering.pipe';
import { VideoDataService } from '../../servises/video-data.service';

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

  constructor(
    private dataService: VideoDataService,
    private formBuilder: FormBuilder,
    private filteringPipe: FilteringPipe,
  ) {}

  public ngOnInit() {
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
      const filteredData = this.filteringPipe.transform(this.searchingForm.value.search, data);
      this.dataService.updateVideoData(filteredData);
      return filteredData;
    } catch {
      throw new Error('Uploading video failed!');
    }
  }

  get _searchingForm() {
    return this.searchingForm;
  }
}
