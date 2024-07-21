import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { debounceTime, distinctUntilChanged, map, switchMap } from 'rxjs';

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

  filteringForm = this.formBuilder.nonNullable.group({
    filter: ['', Validators.required],
  });

  filtering$ = this.filteringForm.controls.filter.valueChanges
    .pipe(
      debounceTime(500),
      distinctUntilChanged(),
      map((rawValue) => rawValue.trim()),
      switchMap((filteredData) => this.dataService.setFilterBy(filteredData)),
    )
    .subscribe();
}
