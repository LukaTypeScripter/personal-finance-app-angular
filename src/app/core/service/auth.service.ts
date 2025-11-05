import { Injectable, signal } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Router } from '@angular/router';
import { Observable, tap, map, catchError, of } from 'rxjs';
import {
  REGISTER_MUTATION,
  LOGIN_MUTATION,
  ME_QUERY,
} from '../graphql/auth.operations';
import {
  User,
  AuthResponse,
  RegisterInput,
  LoginInput,
} from '../models/auth.model';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSignal = signal<User | null>(null);
  private isAuthenticatedSignal = signal<boolean>(false);

  currentUser = this.currentUserSignal.asReadonly();
  isAuthenticated = this.isAuthenticatedSignal.asReadonly();

  constructor(
    private apollo: Apollo,
    private router: Router,
    private storage: StorageService
  ) {
    this.checkAuthStatus();

  }

  register(registerInput: RegisterInput): Observable<AuthResponse> {
    return this.apollo
      .mutate<{ register: AuthResponse }>({
        mutation: REGISTER_MUTATION,
        variables: { registerInput },
      })
      .pipe(
        map((result) => {
          if (!result.data) {
            throw new Error('Registration failed');
          }
          return result.data.register;
        }),
        tap((response) => this.handleAuthResponse(response)),
        catchError((error) => {
          console.error('Registration error:', error);
          throw error;
        })
      );
  }

  login(loginInput: LoginInput): Observable<AuthResponse> {
    return this.apollo
      .mutate<{ login: AuthResponse }>({
        mutation: LOGIN_MUTATION,
        variables: { loginInput },
      })
      .pipe(
        map((result) => {
          if (!result.data) {
            throw new Error('Login failed');
          }
          return result.data.login;
        }),
        tap((response) => this.handleAuthResponse(response)),
        catchError((error) => {
          console.error('Login error:', error);
          throw error;
        })
      );
  }

  getCurrentUser(): Observable<User | null> {
    const token = this.storage.getItem('token');
    if (!token) {
      return of(null);
    }

    return this.apollo
      .query<{ me: User }>({
        query: ME_QUERY,
        fetchPolicy: 'network-only',
      })
      .pipe(
        map((result) => result.data?.me || null),
        tap((user) => {
          if (user) {
            this.currentUserSignal.set(user);
            this.isAuthenticatedSignal.set(true);
          }
        }),
        catchError((error) => {
          console.error('Get current user error:', error);

          if (error?.networkError?.status === 401 || error?.networkError?.status === 403) {
            this.storage.removeItem('token');
            this.currentUserSignal.set(null);
            this.isAuthenticatedSignal.set(false);
          }

          return of(null);
        })
      );
  }

  logout(): void {
    this.storage.removeItem('token');
    this.currentUserSignal.set(null);
    this.isAuthenticatedSignal.set(false);
    this.apollo.client.clearStore();
    this.router.navigate(['/auth/login']);
  }

  private handleAuthResponse(response: AuthResponse): void {
    this.storage.setItem('token', response.accessToken);
    this.currentUserSignal.set(response.user);
    this.isAuthenticatedSignal.set(true);
  }

  private checkAuthStatus(): void {
    const token = this.storage.getItem('token');

    if (token) {
      this.getCurrentUser().subscribe();
    }
  }

  getToken(): string | null {
    return this.storage.getItem('token');
  }
}
