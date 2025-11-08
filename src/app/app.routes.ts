import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./layout/dashboard-layout/dashboard-layout').then(m => m.DashboardLayout),
    canActivate: [authGuard],
    children:[
      {
        path: 'overview',
        loadComponent: () => import('./pages/overview/overview').then(m => m.Overview)
      },
      {
        path: 'transactions',
        loadComponent: () => import('./pages/transactions/transactions').then(m => m.Transactions)
      },
      {
        path: 'budgets',
        loadComponent: () => import('./pages/budgets/budgets').then(m => m.Budgets)
      },
      {
        path: 'pots',
        loadComponent: () => import('./pages/pots/pots').then(m => m.Pots)
      },
    ]
  },
  {
    path: 'auth',
    loadComponent: () => import('./pages/auth/auth').then(m => m.Auth),
    children:[
      {
        path: 'login',
        loadComponent: () => import('./pages/auth/auth-login/auth-login').then(m => m.AuthLogin)
      },
      {
        path: 'register',
        loadComponent: () => import('./pages/auth/auth-register/auth-register').then(m => m.AuthRegister)
      }
    ]
  }
];
