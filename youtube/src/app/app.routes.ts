import { Routes } from '@angular/router';

import loginGuard from './auth/guards/login.guard';

const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./core/layout/layout.component').then((c) => c.default),
    children: [
      {
        path: '',
        redirectTo: 'main',
        pathMatch: 'full',
        title: 'youtube',
      },
      {
        path: 'main',
        loadComponent: () => import('./youtube/pages/main/main.component').then((c) => c.default),
        title: 'youtube',
      },
      {
        path: 'admin',
        loadComponent: () => import('./auth/pages/admin/admin.component').then((c) => c.default),
        title: 'youtube | admin',
      },
      {
        path: 'favorite',
        loadComponent: () => import('./youtube/pages/favorite/favorite.component').then((c) => c.default),
        title: 'youtube | favorite',
      },
      {
        path: 'detailed/:id',
        loadComponent: () => import('./youtube/pages/detailed/detailed.component').then((c) => c.default),
        title: 'youtube | detailed',
      },
    ],
    canActivate: [loginGuard],
  },
  {
    path: 'login',
    loadComponent: () => import('./auth/pages/login/login.component').then((c) => c.default),
    title: 'youtube | login',
  },
  {
    path: '**',
    loadComponent: () => import('./core/pages/not-found/not-found.component').then((c) => c.default),
    title: '404',
  },
];

export default routes;
