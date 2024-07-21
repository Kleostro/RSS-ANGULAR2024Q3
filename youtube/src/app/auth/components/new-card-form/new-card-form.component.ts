import { NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatStepperModule } from '@angular/material/stepper';
import { Store } from '@ngrx/store';

import isValidDate, { isValidDateByFilter } from '../../../shared/validators/date';
import dateFilter from '../../../shared/validators/date-filter';
import { setCustomCard } from '../../../store/actions/videos.actions';
import VideoDataService from '../../../youtube/services/video-data.service';
import AdminFormControls from '../../interfaces/adminFormControls.interface';

@Component({
  selector: 'app-new-card-form',
  standalone: true,
  imports: [
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatStepperModule,
    MatIconModule,
    MatDatepickerModule,
    NgIf,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './new-card-form.component.html',
  styleUrl: './new-card-form.component.scss',
})
export default class NewCardFormComponent {
  fb = inject(FormBuilder);

  videoDataService = inject(VideoDataService);

  store = inject(Store);

  form: FormGroup<AdminFormControls> = this.fb.nonNullable.group({
    title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
    description: ['', [Validators.maxLength(255)]],
    cover: ['', [Validators.required]],
    video: ['', [Validators.required]],
    publishedAt: ['', [Validators.required, isValidDate(), isValidDateByFilter()]],
    tags: new FormArray([
      this.fb.nonNullable.group({
        tag: ['', Validators.required],
      }),
    ]),
  });

  dateFilter = dateFilter;

  addTag() {
    this.form.controls.tags.push(
      this.fb.nonNullable.group({
        tag: ['', Validators.required],
      }),
    );
  }

  reset() {
    this.form.reset();
    const tagsFormArray = this.form.controls.tags;
    while (tagsFormArray.length > 1) {
      tagsFormArray.removeAt(tagsFormArray.length - 1);
    }
  }

  submit() {
    this.form.markAllAsTouched();
    this.form.updateValueAndValidity();
    if (this.form.valid) {
      this.store.dispatch(setCustomCard({ card: this.form.getRawValue() }));
    }
  }
}
