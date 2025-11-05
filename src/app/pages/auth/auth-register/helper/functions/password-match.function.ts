import {AbstractControl, ValidationErrors} from '@angular/forms';

export function passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
  const password = control.get('password')?.value;
  const repeatPassword = control.get('repeatPassword')?.value;


  if (password !== repeatPassword) {
    return { passwordMismatch: true };
  }
  return null;
}
