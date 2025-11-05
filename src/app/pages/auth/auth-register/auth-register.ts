import {Component, inject, signal} from '@angular/core';
import {ReusableInput} from '@/app/shared/components/reuseble-input/reusable-input.component';
import {ReusableButton} from '@/app/shared/components/reusable-button/reusable-button.component';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthCard} from '@/app/pages/auth/components/auth-card/auth-card';
import { Router } from '@angular/router';
import { AuthService } from '@/app/core/service/auth.service';
import {passwordMatchValidator} from '@/app/pages/auth/auth-register/helper/functions/password-match.function';
import {validateFormControl} from '@/app/core/functions/validate-form-control.function';
import {Navigation} from '@/app/shared/service/navigation';



@Component({
  selector: 'app-auth-register',
  imports: [
    AuthCard,
    ReusableInput,
    ReusableButton,
    ReactiveFormsModule,
  ],
  templateUrl: './auth-register.html',
  styleUrl: './auth-register.scss',
})
export class AuthRegister {
  protected readonly validateFormControl = validateFormControl;

  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly navigation = inject(Navigation)

  isLoading = signal(false);
  errorMessage = signal<string | null>(null);

  registerForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    repeatPassword: ['', [Validators.required, Validators.minLength(6)]]
  }, { validators: passwordMatchValidator });



  onSubmit(): void {
    if (this.registerForm.valid) {
      this.isLoading.set(true);
      this.errorMessage.set(null);

      const { name, email, password } = this.registerForm.value;

      this.authService.register({ name, email, password }).subscribe({
        next: (response) => {
          console.log('Registration successful:', response.user);
          this.isLoading.set(false);
          this.navigation.navigateTo('/dashboard/overview');
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
