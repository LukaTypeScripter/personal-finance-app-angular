import { Component, input, output, effect, signal, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Pot, CreatePotInput, UpdatePotInput } from '@/app/core/models/finance-data.model';
import { Currency } from '@/app/core/models/auth.model';
import { ReusableButton } from '@/app/shared/components/reusable-button/reusable-button.component';
import { ReusableModal } from '@/app/shared/components/reusable-modal/reusable-modal.component';
import { PotService } from '@/app/core/service/pot.service';

interface ThemeOption {
  name: string;
  color: string;
}

@Component({
  selector: 'app-pot-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, ReusableButton, ReusableModal],
  templateUrl: './pot-modal.html',
  styleUrl: './pot-modal.scss'
})
export class PotModal {
  private potService = inject(PotService);

  isOpen = input.required<boolean>();
  pot = input<Pot | null>(null);
  currency = input<string>('USD');

  close = output<void>();
  success = output<void>();

  name = signal('');
  target = signal<number>(0);
  selectedTheme = signal('#277C78');
  isSubmitting = signal(false);
  error = signal<string | null>(null);

  isEditMode = computed(() => this.pot() !== null);
  modalTitle = computed(() => this.isEditMode() ? 'Edit Pot' : 'Add New Pot');

  themeOptions: ThemeOption[] = [
    { name: 'Green', color: '#277C78' },
    { name: 'Yellow', color: '#F2CDAC' },
    { name: 'Cyan', color: '#82C9D7' },
    { name: 'Navy', color: '#626070' },
    { name: 'Red', color: '#C94736' },
    { name: 'Purple', color: '#826CB0' },
    { name: 'Turquoise', color: '#597C7C' },
    { name: 'Brown', color: '#93674F' },
    { name: 'Magenta', color: '#934F6F' },
    { name: 'Blue', color: '#3F82B2' },
    { name: 'Grey', color: '#97A0AC' },
    { name: 'Army Green', color: '#7F9161' },
    { name: 'Pink', color: '#AF81BA' },
    { name: 'Gold', color: '#CAB361' },
    { name: 'Orange', color: '#BE6C49' }
  ];

  constructor() {
    effect(() => {
      const potData = this.pot();
      const modalOpen = this.isOpen();

      if (modalOpen && potData) {
        this.name.set(potData.name);
        this.target.set(potData.target);
        this.selectedTheme.set(potData.theme);
      } else if (modalOpen && !potData) {
        this.resetForm();
      }
    });
  }

  resetForm() {
    this.name.set('');
    this.target.set(0);
    this.selectedTheme.set('#277C78');
    this.error.set(null);
  }

  onNameChange(value: string) {
    this.name.set(value);
  }

  onTargetChange(value: string) {
    const num = parseFloat(value);
    this.target.set(isNaN(num) ? 0 : num);
  }

  selectTheme(color: string) {
    this.selectedTheme.set(color);
  }

  onClose() {
    this.resetForm();
    this.close.emit();
  }

  onSubmit() {
    this.error.set(null);

    if (!this.name() || this.target() <= 0) {
      this.error.set('Please fill in all fields correctly');
      return;
    }

    this.isSubmitting.set(true);

    if (this.isEditMode()) {
      const potData = this.pot()!;
      const input: UpdatePotInput = {
        target: this.target(),
        theme: this.selectedTheme(),
        currency: this.currency() as Currency
      };

      this.potService.updatePot(potData.id!, input).subscribe({
        next: () => {
          this.isSubmitting.set(false);
          this.success.emit();
          this.onClose();
        },
        error: (err) => {
          this.isSubmitting.set(false);
          this.error.set('Failed to update pot. Please try again.');
          console.error('Error updating pot:', err);
        }
      });
    } else {
      const input: CreatePotInput = {
        name: this.name(),
        target: this.target(),
        theme: this.selectedTheme(),
        currency: this.currency() as Currency
      };

      this.potService.createPot(input).subscribe({
        next: () => {
          this.isSubmitting.set(false);
          this.success.emit();
          this.onClose();
        },
        error: (err) => {
          this.isSubmitting.set(false);
          this.error.set('Failed to create pot. Please try again.');
          console.error('Error creating pot:', err);
        }
      });
    }
  }
}
