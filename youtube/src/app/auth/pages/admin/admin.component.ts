import { Component } from '@angular/core';

import NewCardFormComponent from '../../components/new-card-form/new-card-form.component';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [NewCardFormComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
})
export default class AdminComponent {}
