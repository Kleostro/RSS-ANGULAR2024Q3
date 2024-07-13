import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { debounceTime, filter, tap } from 'rxjs';

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

  filteringForm = this.formBuilder.group({
    filter: ['', Validators.required],
  });

  ngOnInit(): void {
    this.filteringForm.controls.filter.valueChanges
      .pipe(
        debounceTime(500),
        filter((search: string | null) => (search ? search.length > 1 : search === '')),
        tap((value) =>
          this.dataService.setFilteredData(
            this.filteringPipe.transform(value ?? '', this.dataService.getVideoData().value?.items ?? []),
          ),
        ),
      )
      .subscribe();
  }
}
