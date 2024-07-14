import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { debounceTime, distinctUntilChanged, filter, map, switchMap } from 'rxjs';

import VideoDataService from '../../services/video-data.service';

@Component({
  selector: 'app-video-searching',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './video-searching.component.html',
  styleUrl: './video-searching.component.scss',
})
export default class VideoSearchingComponent {
  dataService = inject(VideoDataService);

  formBuilder = inject(FormBuilder);

  searchingForm = this.formBuilder.group({
    search: ['', Validators.required],
  });

  searching$ = this.searchingForm.controls.search.valueChanges
    .pipe(
      debounceTime(500),
      distinctUntilChanged(),
      map((rawValue) => (rawValue ? rawValue.trim() : '')),
      filter((rawValue) => rawValue.length > 3),
      switchMap((searchValue) => this.dataService.getData(searchValue)),
    )
    .subscribe();
}
