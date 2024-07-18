import { FormControl } from '@angular/forms';

export default interface LoginFormControls {
  login: FormControl<string>;
  password: FormControl<string>;
}
