import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { debounceTime, distinctUntilChanged, map, switchMap, tap } from 'rxjs';

import FilteringPipe from '../../pipes/filtering.pipe';
import VideoDataService from '../../services/video-data.service';

@Component({
  selector: 'app-video-filtering',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  providers: [FilteringPipe],
  templateUrl: './video-filtering.component.html',
  styleUrl: './video-filtering.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class VideoFilteringComponent {
  formBuilder = inject(FormBuilder);

  dataService = inject(VideoDataService);

  filteringPipe = inject(FilteringPipe);

  router = inject(Router);

  filteringForm = this.formBuilder.nonNullable.group({
    filter: ['', Validators.required],
  });

  filtering = this.filteringForm.controls.filter.valueChanges
    .pipe(
      debounceTime(500),
      distinctUntilChanged(),
      map((rawValue) => rawValue.trim()),
      tap(() => this.router.navigate(['/main'])),
      switchMap((filteredData) => this.dataService.setFilterBy(filteredData)),
    )
    .subscribe();
}
