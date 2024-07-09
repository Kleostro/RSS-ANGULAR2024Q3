import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import HeaderComponent from '../header/components/header/header.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [HeaderComponent, RouterOutlet],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export default class LayoutComponent {}
