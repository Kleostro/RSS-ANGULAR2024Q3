import { Routes } from '@angular/router'

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/components/main/main.component').then((m) => m.MainComponent),
    title: 'youtube | main',
  },
]
