import { Component, input, output, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Budget } from '@/app/core/models/finance-data.model';

@Component({
  selector: 'app-budget-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './budget-item.html',
  styleUrl: './budget-item.scss'
})
export class BudgetItem {
  budget = input.required<Budget>();
  currency = input<string>('USD');

  edit = output<void>();
  delete = output<void>();

  currencySymbol = computed(() => this.currency() === 'USD' ? '$' : '₾');

  percentageSpent = computed(() => {
    const budget = this.budget();
    if (!budget.maximum || budget.maximum === 0) return 0;
    return Math.min((budget.spent / budget.maximum) * 100, 100);
  });

  remaining = computed(() => {
    const budget = this.budget();
    return Math.max(budget.maximum - budget.spent, 0);
  });

  isOverBudget = computed(() => {
    const budget = this.budget();
    return budget.spent > budget.maximum;
  });

  statusClass = computed(() => {
    const percentage = this.percentageSpent();
    if (percentage >= 100) return 'danger';
    if (percentage >= 80) return 'warning';
    return 'normal';
  });

  onEdit() {
    this.edit.emit();
  }

  onDelete() {
    this.delete.emit();
  }
}
