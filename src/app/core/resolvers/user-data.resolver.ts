import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from '../service/auth.service';
import { User } from '../models/auth.model';

/**
 * Example resolver that fetches user data BEFORE the route activates
 * This ensures data is loaded before showing the page
 *
 * Usage in routes:
 * {
 *   path: 'dashboard',
 *   resolve: { user: userDataResolver },
 *   component: DashboardComponent
 * }
 */
export const userDataResolver: ResolveFn<User | null> = (route, state) => {
  const authService = inject(AuthService);

  // This will be tracked automatically by NavigationLoaderService
  return authService.getCurrentUser();
};
