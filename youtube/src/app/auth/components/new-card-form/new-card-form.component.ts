import { NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatStepperModule } from '@angular/material/stepper';

import isValidDate, { isValidDateByFilter } from '../../../shared/validators/date';
import dateFilter from '../../../shared/validators/date-filter';
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

  form: FormGroup<AdminFormControls> = this.fb.nonNullable.group({
    title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
    description: ['', [Validators.maxLength(255)]],
    cover: ['', [Validators.required]],
    video: ['', [Validators.required]],
    publisedAt: ['', [Validators.required, isValidDate(), isValidDateByFilter()]],
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

  submit() {}

  reset() {
    this.form.reset();
    const tagsFormArray = this.form.controls.tags;
    while (tagsFormArray.length > 1) {
      tagsFormArray.removeAt(tagsFormArray.length - 1);
    }
  }
}
