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
];
