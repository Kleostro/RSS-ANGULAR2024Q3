import { FormArray, FormControl, FormGroup } from '@angular/forms';

export default interface AdminFormControls {
  title: FormControl<string | null>;
  description: FormControl<string | null>;
  cover: FormControl<string | null>;
  video: FormControl<string | null>;
  publisedAt: FormControl<string | null>;
  tags: FormArray<FormGroup<{ tag: FormControl<string | null> }>>;
}
