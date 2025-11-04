import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthCard } from '@/app/pages/auth/components/auth-card/auth-card';
import { ReusableInput } from '@/app/shared/components/reuseble-input/reusable-input.component';
import { ReusableButton } from '@/app/shared/components/reusable-button/reusable-button.component';

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
  loginForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  getErrorMessages(controlName: string) {
    const control = this.loginForm.get(controlName);
    if (!control) return [];

    const errors = [];

    if (control.hasError('required') && control.touched) {
      errors.push({
        message: `${controlName.charAt(0).toUpperCase() + controlName.slice(1)} is required`,
        isVisible: true
      });
    }

    if (control.hasError('email') && control.touched) {
      errors.push({
        message: 'Please enter a valid email address',
        isVisible: true
      });
    }

    if (control.hasError('minlength') && control.touched) {
      const minLength = control.getError('minlength').requiredLength;
      errors.push({
        message: `Password must be at least ${minLength} characters`,
        isVisible: true
      });
    }

    return errors;
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      console.log('Form submitted:', this.loginForm.value);
      // Handle login logic here
    } else {
      // Mark all fields as touched to show validation errors
      Object.keys(this.loginForm.controls).forEach(key => {
        this.loginForm.controls[key].markAsTouched();
      });
    }
  }
}
