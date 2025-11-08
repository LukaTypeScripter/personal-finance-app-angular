import { Injectable, inject } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { CreateBudgetInput, UpdateBudgetInput, Budget } from '@/app/core/models/finance-data.model';
import {
  CREATE_BUDGET_MUTATION,
  UPDATE_BUDGET_MUTATION,
  DELETE_BUDGET_MUTATION
} from '@/app/core/graphql/finance.operations';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Api } from '@/app/shared/service/api';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {
  private apollo = inject(Apollo);
  private api = inject(Api);

  createBudget(input: CreateBudgetInput): Observable<Budget> {
    return this.apollo
      .mutate<{ createBudget: Budget }>({
        mutation: CREATE_BUDGET_MUTATION,
        variables: { input }
      })
      .pipe(
        map(result => {
          if (!result.data?.createBudget) {
            throw new Error('Failed to create budget');
          }
          // Reload budgets after creation
          this.api.loadBudgets(input.currency);
          return result.data.createBudget;
        })
      );
  }

  updateBudget(id: string, input: UpdateBudgetInput): Observable<Budget> {
    return this.apollo
      .mutate<{ updateBudget: Budget }>({
        mutation: UPDATE_BUDGET_MUTATION,
        variables: { id, input }
      })
      .pipe(
        map(result => {
          if (!result.data?.updateBudget) {
            throw new Error('Failed to update budget');
          }
          // Reload budgets after update
          this.api.loadBudgets(input.currency);
          return result.data.updateBudget;
        })
      );
  }

  deleteBudget(id: string, currency?: string): Observable<boolean> {
    return this.apollo
      .mutate<{ deleteBudget: boolean }>({
        mutation: DELETE_BUDGET_MUTATION,
        variables: { id }
      })
      .pipe(
        map(result => {
          const success = result.data?.deleteBudget ?? false;
          if (success) {
            // Reload budgets after deletion
            this.api.loadBudgets(currency);
          }
          return success;
        })
      );
  }
}
