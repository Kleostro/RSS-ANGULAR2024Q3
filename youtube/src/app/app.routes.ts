import { Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/components/main/main.component').then((c) => c.default),
    title: 'youtube',
  },

  {
    path: 'login',
    loadComponent: () => import('./auth/pages/components/login/login.component').then((c) => c.default),
    title: 'youtube | login',
  },

  {
    path: '**',
    loadComponent: () => import('./core/pages/components/not-found/not-found.component').then((c) => c.default),
    title: '404',
  },
];

export default routes;
