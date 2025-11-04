import {Component, computed, inject} from '@angular/core';
import {ReusableInput} from '@/app/shared/components/reuseble-input/reusable-input.component';
import {ReusableButton} from '@/app/shared/components/reusable-button/reusable-button.component';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthCard} from '@/app/pages/auth/components/auth-card/auth-card';

@Component({
  selector: 'app-auth-register',
  imports: [
    AuthCard,
    ReusableInput,
    ReusableButton,
    ReactiveFormsModule,
    AuthCard
  ],
  templateUrl: './auth-register.html',
  styleUrl: './auth-register.scss',
})
export class AuthRegister {
  private readonly fb = inject(FormBuilder)


  registerForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    repeatPassword: ['', [Validators.required, Validators.minLength(6)]]
  });


  onSubmit(): void {
    if (this.registerForm.valid) {
      console.log('Form submitted:', this.registerForm.value);
      // Handle login logic here
    }
  }
}
