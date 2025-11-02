import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-reusable-button',
  imports: [CommonModule],
  templateUrl: './reusable-button.component.html',
  styleUrl: './reusable-button.component.scss'
})
export class ReusableButton {
  // Button text content
  text = input<string>('');

  // Button variants
  variant = input<'primary' | 'secondary' | 'outlined' | 'ghost'>('primary');

  // Button sizes
  size = input<'small' | 'medium' | 'large'>('medium');

  // Icon configuration
  iconName = input<string>();
  iconPosition = input<'left' | 'right'>('left');
  iconOnly = input<boolean>(false);

  // Button states
  disabled = input<boolean>(false);
  loading = input<boolean>(false);

  // Additional styling
  fullWidth = input<boolean>(false);

  // Button type
  type = input<'button' | 'submit' | 'reset'>('button');

  // Output event
  clicked = output<Event>();

  onClick(event: Event): void {
    if (!this.disabled() && !this.loading()) {
      this.clicked.emit(event);
    }
  }
}
