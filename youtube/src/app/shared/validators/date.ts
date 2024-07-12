import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

const isValidDate =
  (): ValidatorFn =>
  (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) {
      return null;
    }

    return new Date().getTime() < new Date(control.value).getTime() ? { invalidDate: true } : null;
  };

export const isValidDateByFilter =
  (): ValidatorFn =>
  (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) {
      return null;
    }

    return new Date().getTime() < new Date(control.value).getTime() ? { invalidDateByFilter: true } : null;
  };

export default isValidDate;
