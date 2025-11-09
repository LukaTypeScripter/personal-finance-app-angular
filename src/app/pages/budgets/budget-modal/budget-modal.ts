import { Component, input, output, effect, signal, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Budget, CreateBudgetInput, UpdateBudgetInput } from '@/app/core/models/finance-data.model';
import { Currency } from '@/app/core/models/auth.model';
import { ReusableButton } from '@/app/shared/components/reusable-button/reusable-button.component';
import { ReusableModal } from '@/app/shared/components/reusable-modal/reusable-modal.component';
import { BudgetService } from '@/app/core/service/budget.service';
import {TranslateModule, TranslateService} from '@ngx-translate/core';

interface ThemeOption {
  name: string;
  color: string;
}

@Component({
  selector: 'app-budget-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, ReusableButton, ReusableModal, TranslateModule],
  templateUrl: './budget-modal.html',
  styleUrl: './budget-modal.scss'
})
export class BudgetModal {
  private budgetService = inject(BudgetService);
  private translate = inject(TranslateService);

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
  modalTitle = computed(() => this.isEditMode()
    ? this.translate.instant('budgets.modal.editBudgetTitle')
    : this.translate.instant('budgets.modal.addBudgetTitle'));

  categories = computed(() => [
    this.translate.instant('categories.entertainment'),
    this.translate.instant('categories.bills'),
    this.translate.instant('categories.groceries'),
    this.translate.instant('categories.diningOut'),
    this.translate.instant('categories.transportation'),
    this.translate.instant('categories.personalCare'),
    this.translate.instant('categories.education'),
    this.translate.instant('categories.lifestyle'),
    this.translate.instant('categories.shopping'),
    this.translate.instant('categories.general')
  ]);

  themeOptions = computed<ThemeOption[]>(() => [
    { name: this.translate.instant('themes.green'), color: '#277C78' },
    { name: this.translate.instant('themes.yellow'), color: '#F2CDAC' },
    { name: this.translate.instant('themes.cyan'), color: '#82C9D7' },
    { name: this.translate.instant('themes.navy'), color: '#626070' },
    { name: this.translate.instant('themes.red'), color: '#C94736' },
    { name: this.translate.instant('themes.purple'), color: '#826CB0' },
    { name: this.translate.instant('themes.turquoise'), color: '#597C7C' },
    { name: this.translate.instant('themes.brown'), color: '#93674F' },
    { name: this.translate.instant('themes.magenta'), color: '#934F6F' },
    { name: this.translate.instant('themes.blue'), color: '#3F82B2' },
    { name: this.translate.instant('themes.grey'), color: '#97A0AC' },
    { name: this.translate.instant('themes.armyGreen'), color: '#7F9161' },
    { name: this.translate.instant('themes.pink'), color: '#AF81BA' },
    { name: this.translate.instant('themes.gold'), color: '#CAB361' },
    { name: this.translate.instant('themes.orange'), color: '#BE6C49' }
  ]);

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
      this.error.set(this.translate.instant('errors.fillAllFields'));
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
          this.error.set(this.translate.instant('errors.updateBudgetFailed'));
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
          this.error.set(this.translate.instant('errors.createBudgetFailed'));
          console.error('Error creating budget:', err);
        }
      });
    }
  }
}
