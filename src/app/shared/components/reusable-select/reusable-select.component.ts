import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

export interface SelectOption {
  value: string;
  label: string;
}

@Component({
  selector: 'app-reusable-select',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="reusable-select">
      <label *ngIf="label" class="reusable-select__label">
        {{ label }}
      </label>
      <div class="reusable-select__wrapper">
        <select
          [value]="value"
          (change)="onChange($event)"
          (blur)="onTouched()"
          [disabled]="disabled"
          class="reusable-select__input"
        >
          <option *ngFor="let option of options" [value]="option.value">
            {{ option.label }}
          </option>
        </select>
      </div>
      <div *ngIf="errorMessage && errorMessage.length > 0" class="reusable-select__errors">
        <span
          *ngFor="let error of errorMessage"
          [class.reusable-select__error--visible]="error.isVisible"
          class="reusable-select__error"
        >
          {{ error.message }}
        </span>
      </div>
    </div>
  `,
  styles: [`
    .reusable-select {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      width: 100%;
    }

    .reusable-select__label {
      font-size: 0.75rem;
      font-weight: 700;
      color: var(--grey-500);
    }

    .reusable-select__wrapper {
      position: relative;
      width: 100%;
    }

    .reusable-select__input {
      width: 100%;
      padding: 0.75rem 1.25rem;
      border: 1px solid var(--beige-500);
      border-radius: 0.5rem;
      font-size: 0.875rem;
      font-weight: 400;
      color: var(--grey-900);
      background-color: var(--white);
      cursor: pointer;
      transition: border-color 0.2s;
      appearance: none;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath fill='%23696868' d='M1.41 0L6 4.58 10.59 0 12 1.41l-6 6-6-6z'/%3E%3C/svg%3E");
      background-repeat: no-repeat;
      background-position: right 1rem center;
      padding-right: 2.5rem;
    }

    .reusable-select__input:hover {
      border-color: var(--grey-500);
    }

    .reusable-select__input:focus {
      outline: none;
      border-color: var(--grey-900);
    }

    .reusable-select__input:disabled {
      background-color: var(--beige-100);
      cursor: not-allowed;
      opacity: 0.6;
    }

    .reusable-select__errors {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }

    .reusable-select__error {
      font-size: 0.75rem;
      color: var(--red);
      display: none;
    }

    .reusable-select__error--visible {
      display: block;
    }
  `],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ReusableSelect),
      multi: true
    }
  ]
})
export class ReusableSelect implements ControlValueAccessor {
  @Input() label: string = '';
  @Input() options: SelectOption[] = [];
  @Input() errorMessage: { message: string; isVisible: boolean }[] = [];
  @Input() disabled: boolean = false;

  value: string = '';

  onChange: any = () => {};
  onTouched: any = () => {};

  writeValue(value: string): void {
    this.value = value || '';
  }

  registerOnChange(fn: any): void {
    this.onChange = (event: Event) => {
      const target = event.target as HTMLSelectElement;
      this.value = target.value;
      fn(target.value);
    };
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
