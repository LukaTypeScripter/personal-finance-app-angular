import {Component, inject, signal} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthCard } from '@/app/pages/auth/components/auth-card/auth-card';
import { ReusableInput } from '@/app/shared/components/reuseble-input/reusable-input.component';
import { ReusableButton } from '@/app/shared/components/reusable-button/reusable-button.component';
import { AuthService } from '@/app/core/service/auth.service';

@Component({
  selector: 'app-auth-login',
  imports: [
    ReactiveFormsModule,
    AuthCard,
    ReusableInput,
    ReusableButton
  ],
  templateUrl: './auth-login.html',
  styleUrl: './auth-login.scss'
})
export class AuthLogin {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  isLoading = signal(false);
  errorMessage = signal<string | null>(null);

  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.isLoading.set(true);
      this.errorMessage.set(null);

      this.authService.login(this.loginForm.value).subscribe({
        next: (response) => {
          console.log('Login successful:', response.user);
          this.isLoading.set(false);
          this.router.navigate(['/dashboard/overview']);
        },
        error: (error) => {
          console.error('Login failed:', error);
          this.errorMessage.set(error?.message || 'Login failed. Please try again.');
          this.isLoading.set(false);
        }
      });
    }
  }
}
