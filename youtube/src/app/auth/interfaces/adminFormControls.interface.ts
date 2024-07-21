import { FormArray, FormControl, FormGroup } from '@angular/forms';

export default interface AdminFormControls {
  title: FormControl<string>;
  description: FormControl<string>;
  cover: FormControl<string>;
  video: FormControl<string>;
  publishedAt: FormControl<string>;
  tags: FormArray<FormGroup<{ tag: FormControl<string> }>>;
}
