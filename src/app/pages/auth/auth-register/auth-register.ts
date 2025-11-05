import {Component, inject, signal} from '@angular/core';
import {ReusableInput} from '@/app/shared/components/reuseble-input/reusable-input.component';
import {ReusableButton} from '@/app/shared/components/reusable-button/reusable-button.component';
import {AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators} from '@angular/forms';
import {AuthCard} from '@/app/pages/auth/components/auth-card/auth-card';
import { Router } from '@angular/router';
import { AuthService } from '@/app/core/service/auth.service';

@Component({
  selector: 'app-auth-register',
  imports: [
    AuthCard,
    ReusableInput,
    ReusableButton,
    ReactiveFormsModule
  ],
  templateUrl: './auth-register.html',
  styleUrl: './auth-register.scss',
})
export class AuthRegister {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  isLoading = signal(false);
  errorMessage = signal<string | null>(null);

  registerForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    repeatPassword: ['', [Validators.required, Validators.minLength(6)]]
  }, { validators: this.passwordMatchValidator });

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const repeatPassword = control.get('repeatPassword')?.value;

    if (password !== repeatPassword) {
      return { passwordMismatch: true };
    }
    return null;
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      this.isLoading.set(true);
      this.errorMessage.set(null);

      const { name, email, password } = this.registerForm.value;

      this.authService.register({ name, email, password }).subscribe({
        next: (response) => {
          console.log('Registration successful:', response.user);
          this.isLoading.set(false);
          this.router.navigate(['/dashboard/overview']);
        },
        error: (error) => {
          console.error('Registration failed:', error);
          this.errorMessage.set(error?.message || 'Registration failed. Please try again.');
          this.isLoading.set(false);
        }
      });
    }
  }
}
