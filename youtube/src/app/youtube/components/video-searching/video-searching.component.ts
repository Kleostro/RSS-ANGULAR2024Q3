import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { debounceTime, filter, tap } from 'rxjs';

import VideoDataService from '../../services/video-data.service';

@Component({
  selector: 'app-video-searching',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './video-searching.component.html',
  styleUrl: './video-searching.component.scss',
})
export default class VideoSearchingComponent implements OnInit {
  dataService = inject(VideoDataService);

  formBuilder = inject(FormBuilder);

  searchingForm = this.formBuilder.group({
    search: ['', Validators.required],
  });

  ngOnInit(): void {
    this.searchingForm.controls.search.valueChanges
      .pipe(
        debounceTime(500),
        filter((search: string | null) => (search ? search.length > 3 : search === '')),
        tap((value) => {
          if (value) {
            this.dataService.getData(value);
          }
        }),
      )
      .subscribe();
  }
}
