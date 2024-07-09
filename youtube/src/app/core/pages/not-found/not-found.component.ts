import { Component } from '@angular/core';

import CustomLinkComponent from '../../../shared/components/custom-link/custom-link.component';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [CustomLinkComponent],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.scss',
})
export default class NotFoundComponent {}
