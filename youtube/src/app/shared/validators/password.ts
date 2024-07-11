import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const isPasswordHasUpperCase =
  (): ValidatorFn =>
  (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) {
      return null;
    }

    return !/[A-Z]+/.test(control.value) ? { hasUpperCase: true } : null;
  };

export const isPasswordHasLowerCase =
  (): ValidatorFn =>
  (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) {
      return null;
    }

    return !/[a-z]+/.test(control.value) ? { hasLowerCase: true } : null;
  };

export const isPasswordHasNumeric =
  (): ValidatorFn =>
  (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) {
      return null;
    }

    return !/[0-9]+/.test(control.value) ? { hasNumeric: true } : null;
  };

export const isPasswordHasSpecialCharacter =
  (): ValidatorFn =>
  (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) {
      return null;
    }

    return !/[!"#$%&'()*+,-.\\/:;<=>?@[\]^_`{|}~]+/.test(control.value) ? { hasSpecialCharacter: true } : null;
  };
