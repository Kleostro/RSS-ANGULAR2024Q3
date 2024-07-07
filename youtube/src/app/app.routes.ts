import { Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/components/main/main.component').then((m) => m.default),
    title: 'youtube',
  },
];

export default routes;
