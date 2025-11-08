import { Component, Input, Output, EventEmitter, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface BottomSheetOption {
  value: string;
  label: string;
}

@Component({
  selector: 'app-reusable-bottom-sheet',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (isOpen()) {
      <div class="bottom-sheet__backdrop" (click)="close()"></div>

      <div class="bottom-sheet">
        <div class="bottom-sheet__header">
          <h3 class="bottom-sheet__title">{{ title }}</h3>
          <button class="bottom-sheet__close" (click)="close()">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>

        <div class="bottom-sheet__content">
          @for (option of options; track option.value) {
            <div
              class="bottom-sheet__option"
              [class.bottom-sheet__option--active]="option.value === selectedValue()"
              (click)="selectOption(option.value)">
              {{ option.label }}
            </div>
          }
        </div>
      </div>
    }
  `,
  styleUrl: './reusable-bottom-sheet.component.scss'
})
export class ReusableBottomSheet {
  @Input() title: string = '';
  @Input() options: BottomSheetOption[] = [];
  @Input() selectedValue = signal<string>('');
  @Input() isOpen = signal<boolean>(false);
  @Output() selectionChange = new EventEmitter<string>();
  @Output() closeSheet = new EventEmitter<void>();

  selectOption(value: string) {
    this.selectionChange.emit(value);
  }

  close() {
    this.closeSheet.emit();
  }
}
