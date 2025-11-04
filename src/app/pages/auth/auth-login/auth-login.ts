import {Component, inject} from '@angular/core';
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
  private readonly fb = inject(FormBuilder)


  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });




  onSubmit(): void {
    if (this.loginForm.valid) {
      console.log('Form submitted:', this.loginForm.value);
      // Handle login logic here
    }
  }
}
