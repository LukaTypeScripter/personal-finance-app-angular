import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./pages/overview/overview').then(m => m.Overview)
    },
    {
        path: 'transactions',
        loadComponent: () => import('./pages/transactions/transactions').then(m => m.Transactions)
    },
  {
    path: 'auth',
    children:[
      {
        path: 'login',
        loadComponent: () => import('./pages/auth/auth-login/auth-login').then(m => m.AuthLogin)
      },
      {
        path: 'login',
        loadComponent: () => import('./pages/auth/auth-register/auth-register').then(m => m.AuthRegister)
      }
    ]
  }
];
