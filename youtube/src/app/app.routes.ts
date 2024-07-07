import { Routes } from '@angular/router';

import loginGuard from './auth/guards/login.guard';

const routes: Routes = [
  {
    path: 'main',
    loadComponent: () => import('./youtube/pages/components/main/main.component').then((c) => c.default),
    title: 'youtube',
    canActivate: [loginGuard],
  },
  {
    path: '',
    loadComponent: () => import('./youtube/pages/components/main/main.component').then((c) => c.default),
    title: 'youtube',
    canActivate: [loginGuard],
  },

  {
    path: 'login',
    loadComponent: () => import('./auth/pages/components/login/login.component').then((c) => c.default),
    title: 'youtube | login',
  },

  {
    path: 'detailed/:id',
    loadComponent: () => import('./youtube/pages/components/detailed/detailed.component').then((c) => c.default),
    title: 'youtube | detailed',
    canActivate: [loginGuard],
  },

  {
    path: '**',
    loadComponent: () => import('./core/pages/components/not-found/not-found.component').then((c) => c.default),
    title: '404',
  },
];

export default routes;
