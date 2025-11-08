import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReusableModal } from '../reusable-modal/reusable-modal.component';
import { ReusableButton } from '../reusable-button/reusable-button.component';

@Component({
  selector: 'app-delete-confirmation-modal',
  standalone: true,
  imports: [CommonModule, ReusableModal, ReusableButton],
  templateUrl: './delete-confirmation-modal.component.html',
  styleUrl: './delete-confirmation-modal.component.scss'
})
export class DeleteConfirmationModal {
  isOpen = input.required<boolean>();
  title = input<string>('Delete Confirmation');
  itemName = input<string>('this item');
  itemType = input<string>('item');

  close = output<void>();
  confirm = output<void>();

  onClose() {
    this.close.emit();
  }

  onConfirm() {
    this.confirm.emit();
  }
}
