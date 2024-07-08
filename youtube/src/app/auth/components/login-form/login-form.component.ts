import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import CustomButtonComponent from '../../../shared/components/custom-button/custom-button.component';
import LoginService from '../../services/login.service';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [ReactiveFormsModule, CustomButtonComponent, MatFormFieldModule, MatInputModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss',
})
export default class LoginFormComponent implements OnInit {
  formBuilder = inject(FormBuilder);

  loginService = inject(LoginService);

  loginForm!: FormGroup;

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      login: [null, Validators.required],
      password: [null, Validators.required],
    });
  }

  submit() {
    this.loginService.login(this.loginForm.value);
  }
}
