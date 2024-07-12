import { Component, inject } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatStepperModule } from '@angular/material/stepper';

import CustomButtonComponent from '../../../shared/components/custom-button/custom-button.component';
import isValidDate, { isValidDateByFilter } from '../../../shared/validators/date';
import AdminFormControls from '../../interfaces/adminFormControls.interface';

@Component({
  selector: 'app-new-card-form',
  standalone: true,
  imports: [
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatStepperModule,
    CustomButtonComponent,
    MatIconModule,
    MatDatepickerModule,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './new-card-form.component.html',
  styleUrl: './new-card-form.component.scss',
})
export default class NewCardFormComponent {
  fb = inject(FormBuilder);

  form: FormGroup<AdminFormControls> = this.fb.group<AdminFormControls>({
    title: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
    description: new FormControl('', [Validators.maxLength(255)]),
    cover: new FormControl('', [Validators.required]),
    video: new FormControl('', [Validators.required]),
    publisedAt: new FormControl('', [Validators.required, isValidDate(), isValidDateByFilter()]),
    tags: new FormArray([
      this.fb.group({
        tag: ['', Validators.required],
      }),
    ]),
  });

  dateFilter = (date: Date | null): boolean => {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    return !date || date <= currentDate;
  };

  getTagsFormArray() {
    return this.form.get('tags') as FormArray<FormGroup>;
  }

  addTag() {
    const tagForm = this.fb.group({
      tag: ['', Validators.required],
    });
    this.getTagsFormArray().push(tagForm);
  }

  removeTag(index: number) {
    this.getTagsFormArray().removeAt(index);
  }

  submit() {}

  reset() {
    this.form.reset();
    const tagsFormArray = this.getTagsFormArray();
    while (tagsFormArray.length > 1) {
      tagsFormArray.removeAt(tagsFormArray.length - 1);
    }
  }
}
