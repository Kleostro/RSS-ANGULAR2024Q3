import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import CustomButtonComponent from '../../../shared/components/custom-button/custom-button.component';
import MAT_ATTRIBUTE from '../../../shared/constants/matAttribute';
import {
  isPasswordHasLowerCase,
  isPasswordHasNumeric,
  isPasswordHasSpecialCharacter,
  isPasswordHasUpperCase,
} from '../../../shared/validators/password';
import LoginFormControls from '../../interfaces/loginFormControls.interface';
import LoginService from '../../services/login.service';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CustomButtonComponent, MatFormFieldModule, MatInputModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss',
})
export default class LoginFormComponent {
  formBuilder = inject(FormBuilder);

  loginService = inject(LoginService);

  matAttribute = MAT_ATTRIBUTE;

  loginForm = this.formBuilder.group<LoginFormControls>({
    login: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      isPasswordHasLowerCase(),
      isPasswordHasNumeric(),
      isPasswordHasSpecialCharacter(),
      isPasswordHasUpperCase(),
    ]),
  });

  submit() {
    const { login, password } = this.getFormFields();
    if (login.value && password.value) {
      this.loginService.login({ login: login.value, password: password.value });
    }
  }

  getFormFields() {
    const { login, password } = this.loginForm.controls;
    return { login, password };
  }
}
