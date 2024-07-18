import { NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
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
  imports: [ReactiveFormsModule, CustomButtonComponent, MatFormFieldModule, MatInputModule, NgIf],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss',
})
export default class LoginFormComponent {
  formBuilder = inject(FormBuilder);

  loginService = inject(LoginService);

  matAttribute = MAT_ATTRIBUTE;

  loginForm: FormGroup<LoginFormControls> = this.formBuilder.nonNullable.group({
    login: ['', [Validators.required, Validators.email]],
    password: [
      '',
      [
        Validators.required,
        isPasswordHasLowerCase(),
        isPasswordHasNumeric(),
        isPasswordHasSpecialCharacter(),
        isPasswordHasUpperCase(),
      ],
    ],
  });

  submit() {
    const { login, password } = this.loginForm.value;
    if (login && password) {
      this.loginService.login({ login, password });
    }
  }
}
