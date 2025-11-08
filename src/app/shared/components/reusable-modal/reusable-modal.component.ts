import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reusable-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reusable-modal.component.html',
  styleUrl: './reusable-modal.component.scss'
})
export class ReusableModal {
  isOpen = input.required<boolean>();
  title = input<string>('');
  showHeader = input<boolean>(true);
  showCloseButton = input<boolean>(true);
  maxWidth = input<string>('560px');

  close = output<void>();

  onBackdropClick() {
    this.close.emit();
  }

  onClose() {
    this.close.emit();
  }
}
