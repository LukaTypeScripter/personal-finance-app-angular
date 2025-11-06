import { Component, Input, Output, EventEmitter, signal, HostListener, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReusableButton } from '../reusable-button/reusable-button.component';

export interface DropdownOption {
  value: string;
  label: string;
}

@Component({
  selector: 'app-reusable-dropdown',
  standalone: true,
  imports: [CommonModule, ReusableButton],
  template: `
    <div class="dropdown" [class.dropdown--open]="isOpen()">
      <app-reusable-button
        [text]="selectedLabel()"
        [iconName]="'icon-caret-down'"
        [iconPosition]="'right'"
        [variant]="'outlined'"
        [size]="size"
        (click)="toggleDropdown()"
      />

      @if (isOpen()) {
        <div class="dropdown__menu">
          @for (option of options; track option.value) {
            <div
              class="dropdown__item"
              [class.dropdown__item--active]="option.value === selectedValue()"
              (click)="selectOption(option)"
            >
              {{ option.label }}
            </div>
          }
        </div>
      }
    </div>
  `,
  styles: [`
    .dropdown {
      position: relative;
      display: inline-block;
    }

    .dropdown__menu {
      position: absolute;
      top: calc(100% + 0.5rem);
      left: 0;
      right: 0;
      background: white;
      border: 1px solid var(--beige-500);
      border-radius: 0.5rem;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      z-index: 1000;
      overflow: hidden;
      animation: slideDown 0.2s ease-out;
    }

    @keyframes slideDown {
      from {
        opacity: 0;
        transform: translateY(-8px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .dropdown__item {
      padding: 0.75rem 1rem;
      cursor: pointer;
      transition: background-color 0.15s;
      font-size: 0.875rem;
      color: var(--grey-900);
    }

    .dropdown__item:hover {
      background-color: var(--beige-100);
    }

    .dropdown__item--active {
      background-color: var(--beige-100);
      font-weight: 700;
    }

    .dropdown__item:not(:last-child) {
      border-bottom: 1px solid var(--beige-500);
    }
  `]
})
export class ReusableDropdown {
  @Input() options: DropdownOption[] = [];
  @Input() selectedValue = signal<string>('');
  @Input() size: 'small' | 'medium' | 'large' = 'small';
  @Output() selectionChange = new EventEmitter<string>();

  isOpen = signal(false);

  selectedLabel = signal('');

  constructor(private elementRef: ElementRef) {}

  ngOnInit() {
    this.updateSelectedLabel();
  }

  ngOnChanges() {
    this.updateSelectedLabel();
  }

  toggleDropdown() {
    this.isOpen.update(v => !v);
  }

  selectOption(option: DropdownOption) {
    this.selectedValue.set(option.value);
    this.selectedLabel.set(option.label);
    this.selectionChange.emit(option.value);
    this.isOpen.set(false);
  }

  private updateSelectedLabel() {
    const selected = this.options.find(opt => opt.value === this.selectedValue());
    if (selected) {
      this.selectedLabel.set(selected.label);
    } else if (this.options.length > 0) {
      this.selectedLabel.set(this.options[0].label);
      this.selectedValue.set(this.options[0].value);
    }
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.isOpen.set(false);
    }
  }
}
