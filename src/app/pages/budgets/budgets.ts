import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Api } from '@/app/shared/service/api';
import { DonutChart } from '@/app/shared/components/donut-chart/donut-chart';
import { ReusableButton } from '@/app/shared/components/reusable-button/reusable-button.component';
import { BudgetItem } from './budget-item/budget-item';
import { BudgetModal } from './budget-modal/budget-modal';
import { DeleteConfirmationModal } from '@/app/shared/components/delete-confirmation-modal/delete-confirmation-modal.component';
import { Budget } from '@/app/core/models/finance-data.model';
import { BudgetService } from '@/app/core/service/budget.service';

@Component({
  selector: 'app-budgets',
  standalone: true,
  imports: [CommonModule, DonutChart, ReusableButton, BudgetItem, BudgetModal, DeleteConfirmationModal],
  templateUrl: './budgets.html',
  styleUrl: './budgets.scss'
})
export class Budgets implements OnInit {
  private api = inject(Api);
  private budgetService = inject(BudgetService);

  budgets = this.api.budgets;
  currency = this.api.currency;
  isBudgetModalOpen = signal(false);
  isDeleteModalOpen = signal(false);
  selectedBudget = signal<Budget | null>(null);
  budgetToDelete = signal<Budget | null>(null);

  ngOnInit(): void {
    this.api.loadOverviewData(this.currency());
  }

  openAddBudgetModal() {
    this.selectedBudget.set(null);
    this.isBudgetModalOpen.set(true);
  }

  closeBudgetModal() {
    this.isBudgetModalOpen.set(false);
    this.selectedBudget.set(null);
  }

  openEditBudgetModal(budget: Budget) {
    this.selectedBudget.set(budget);
    this.isBudgetModalOpen.set(true);
  }

  onBudgetEdit(budget: Budget) {
    this.openEditBudgetModal(budget);
  }

  onBudgetDelete(budgetId: string) {
    const budget = this.budgets().find(b => b.id === budgetId);
    if (budget) {
      this.budgetToDelete.set(budget);
      this.isDeleteModalOpen.set(true);
    }
  }

  closeDeleteModal() {
    this.isDeleteModalOpen.set(false);
    this.budgetToDelete.set(null);
  }

  confirmDelete() {
    const budget = this.budgetToDelete();
    if (budget?.id) {
      this.budgetService.deleteBudget(budget.id, this.currency()).subscribe({
        next: () => {
          console.log('Budget deleted successfully');
          this.closeDeleteModal();
        },
        error: (err) => {
          console.error('Error deleting budget:', err);
          this.closeDeleteModal();
        }
      });
    }
  }

  onBudgetSuccess() {
    console.log('Budget operation successful');
  }
}
