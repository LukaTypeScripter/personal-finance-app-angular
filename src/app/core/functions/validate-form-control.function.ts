import {AbstractControl, FormGroup} from '@angular/forms';

export const validateFormControl = (
  formGroup: FormGroup | AbstractControl,
  field: string,
  error?: string,
  isCustomError?:boolean
): boolean => {
  return !!(
    formGroup.get(field)?.touched &&
    formGroup.get(field)?.invalid &&
    (error && !isCustomError
      ? formGroup.get(field)?.errors?.[error]
      : error && isCustomError ?  formGroup.errors?.[error] : formGroup.get(field)?.errors)
  );
};
