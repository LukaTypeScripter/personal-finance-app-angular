import { CommonModule } from '@angular/common';
import {Component, computed, input} from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'app-reusable-input',
  imports: [CommonModule],
  templateUrl: './reusable-input.component.html',
  styleUrl: './reusable-input.component.scss'
})
export class ReusableInput implements ControlValueAccessor {
  iconPosition = input<'left' | 'right'>()
  iconName = input<string>()
  placeholder = input<string>()
  label = input<string>()

  errorMessage = input<{
    message: string,
    isVisible: boolean
  }[]>()

  hasError = computed(() => this.errorMessage()?.some(error => error.isVisible) ?? false)

  value = ''
  isDisabled = false;

  onChanged: Function = () => {
  };
  onTouched: Function = () => {
  };

  registerOnChange(fn: Function) {
    this.onChanged = fn;
  }

  registerOnTouched(fn: Function) {
    this.onTouched = fn;
  }

  writeValue(value: any): void {
    this.value = value
  }


  onInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.value = target.value;
    this.onChanged(this.value);
  }

  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }
}
