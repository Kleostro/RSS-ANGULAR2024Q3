import { FormControl } from '@angular/forms';

export default interface LoginFormControls {
  login: FormControl<string | null>;
  password: FormControl<string | null>;
}
