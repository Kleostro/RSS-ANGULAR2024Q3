import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs';

import { searchVideos } from '../../../store/actions/videos.actions';
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

  store = inject(Store);

  searchingForm = this.formBuilder.nonNullable.group({
    search: ['', Validators.required],
  });

  searching$ = this.searchingForm.controls.search.valueChanges
    .pipe(
      debounceTime(500),
      distinctUntilChanged(),
      filter((rawValue) => rawValue.trim().length > 3),
      map((searchValue) => this.store.dispatch(searchVideos({ searchValue }))),
    )
    .subscribe();
}
