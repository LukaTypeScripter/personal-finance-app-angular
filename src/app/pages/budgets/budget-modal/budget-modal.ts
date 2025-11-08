import { Component, input, output, effect, signal, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Budget, CreateBudgetInput, UpdateBudgetInput } from '@/app/core/models/finance-data.model';
import { Currency } from '@/app/core/models/auth.model';
import { ReusableButton } from '@/app/shared/components/reusable-button/reusable-button.component';
import { ReusableModal } from '@/app/shared/components/reusable-modal/reusable-modal.component';
import { BudgetService } from '@/app/core/service/budget.service';

interface ThemeOption {
  name: string;
  color: string;
}

@Component({
  selector: 'app-budget-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, ReusableButton, ReusableModal],
  templateUrl: './budget-modal.html',
  styleUrl: './budget-modal.scss'
})
export class BudgetModal {
  private budgetService = inject(BudgetService);

  isOpen = input.required<boolean>();
  budget = input<Budget | null>(null);
  currency = input<string>('USD');

  close = output<void>();
  success = output<void>();

  category = signal('');
  maximum = signal<number>(0);
  selectedTheme = signal('#277C78');
  isSubmitting = signal(false);
  error = signal<string | null>(null);

  isEditMode = computed(() => this.budget() !== null);
  modalTitle = computed(() => this.isEditMode() ? 'Edit Budget' : 'Add New Budget');

  categories = [
    'Entertainment',
    'Bills',
    'Groceries',
    'Dining Out',
    'Transportation',
    'Personal Care',
    'Education',
    'Lifestyle',
    'Shopping',
    'General'
  ];

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
      const budgetData = this.budget();
      const modalOpen = this.isOpen();

      if (modalOpen && budgetData) {
        this.category.set(budgetData.category);
        this.maximum.set(budgetData.maximum);
        this.selectedTheme.set(budgetData.theme);
      } else if (modalOpen && !budgetData) {
        this.resetForm();
      }
    });
  }

  resetForm() {
    this.category.set('');
    this.maximum.set(0);
    this.selectedTheme.set('#277C78');
    this.error.set(null);
  }

  onCategoryChange(value: string) {
    this.category.set(value);
  }

  onMaximumChange(value: string) {
    const num = parseFloat(value);
    this.maximum.set(isNaN(num) ? 0 : num);
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

    if (!this.category() || this.maximum() <= 0) {
      this.error.set('Please fill in all fields correctly');
      return;
    }

    this.isSubmitting.set(true);

    if (this.isEditMode()) {
      const budgetData = this.budget()!;
      const input: UpdateBudgetInput = {
        maximum: this.maximum(),
        theme: this.selectedTheme(),
        currency: this.currency() as Currency
      };

      this.budgetService.updateBudget(budgetData.id!, input).subscribe({
        next: () => {
          this.isSubmitting.set(false);
          this.success.emit();
          this.onClose();
        },
        error: (err) => {
          this.isSubmitting.set(false);
          this.error.set('Failed to update budget. Please try again.');
          console.error('Error updating budget:', err);
        }
      });
    } else {
      const input: CreateBudgetInput = {
        category: this.category(),
        maximum: this.maximum(),
        theme: this.selectedTheme(),
        currency: this.currency() as Currency
      };

      this.budgetService.createBudget(input).subscribe({
        next: () => {
          this.isSubmitting.set(false);
          this.success.emit();
          this.onClose();
        },
        error: (err) => {
          this.isSubmitting.set(false);
          this.error.set('Failed to create budget. Please try again.');
          console.error('Error creating budget:', err);
        }
      });
    }
  }
}
