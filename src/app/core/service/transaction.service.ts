import { Injectable, inject } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { CreateTransactionInput, UpdateTransactionInput, Transaction } from '@/app/core/models/finance-data.model';
import {
  CREATE_TRANSACTION_MUTATION,
  UPDATE_TRANSACTION_MUTATION,
  DELETE_TRANSACTION_MUTATION
} from '@/app/core/graphql/finance.operations';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Api } from '@/app/shared/service/api';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private apollo = inject(Apollo);
  private api = inject(Api);

  createTransaction(input: CreateTransactionInput): Observable<Transaction> {
    return this.apollo
      .mutate<{ createTransaction: Transaction }>({
        mutation: CREATE_TRANSACTION_MUTATION,
        variables: { input }
      })
      .pipe(
        map(result => {
          if (!result.data?.createTransaction) {
            throw new Error('Failed to create transaction');
          }
          // Reload transactions after creation
          this.api.loadTransactions();
          return result.data.createTransaction;
        })
      );
  }

  updateTransaction(id: string, input: UpdateTransactionInput): Observable<Transaction> {
    return this.apollo
      .mutate<{ updateTransaction: Transaction }>({
        mutation: UPDATE_TRANSACTION_MUTATION,
        variables: { id, input }
      })
      .pipe(
        map(result => {
          if (!result.data?.updateTransaction) {
            throw new Error('Failed to update transaction');
          }
          // Reload transactions after update
          this.api.loadTransactions();
          return result.data.updateTransaction;
        })
      );
  }

  deleteTransaction(id: string): Observable<boolean> {
    return this.apollo
      .mutate<{ deleteTransaction: boolean }>({
        mutation: DELETE_TRANSACTION_MUTATION,
        variables: { id }
      })
      .pipe(
        map(result => {
          const success = result.data?.deleteTransaction ?? false;
          if (success) {
            // Reload transactions after deletion
            this.api.loadTransactions();
          }
          return success;
        })
      );
  }
}
