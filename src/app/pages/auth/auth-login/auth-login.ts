import {Component, inject, signal} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthCard } from '@/app/pages/auth/components/auth-card/auth-card';
import { ReusableInput } from '@/app/shared/components/reuseble-input/reusable-input.component';
import { ReusableButton } from '@/app/shared/components/reusable-button/reusable-button.component';
import { AuthService } from '@/app/core/service/auth.service';
import {validateFormControl} from '@/app/core/functions/validate-form-control.function';
import {Navigation} from '@/app/shared/service/navigation';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-auth-login',
  imports: [
    ReactiveFormsModule,
    AuthCard,
    ReusableInput,
    ReusableButton,
    TranslateModule
  ],
  templateUrl: './auth-login.html',
  styleUrl: './auth-login.scss'
})
export class AuthLogin {
  protected readonly validateFormControl = validateFormControl;

  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly navigation = inject(Navigation)

  isLoading = signal(false);
  errorMessage = signal<string | null>(null);

  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  constructor() {
    this.loginForm.valueChanges.subscribe(() => {
      console.log(this.loginForm.get('password')?.errors)
    })
  }

  public getFormControl() {
    return this.loginForm.get('email');
  }

  public onSubmit(): void {
    if (this.loginForm.valid) {
      this.isLoading.set(true);
      this.errorMessage.set(null);

      this.authService.login(this.loginForm.value).subscribe({
        next: (response) => {
          console.log('Login successful:', response.user);
          this.isLoading.set(false);
          this.navigation.navigateTo('/dashboard/overview');
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
