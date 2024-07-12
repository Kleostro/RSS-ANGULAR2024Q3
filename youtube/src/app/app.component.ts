import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import HeaderComponent from './core/header/header.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
})
export default class AppComponent {}
