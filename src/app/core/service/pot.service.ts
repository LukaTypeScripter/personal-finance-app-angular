import { Injectable, inject } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { CreatePotInput, UpdatePotInput, Pot } from '@/app/core/models/finance-data.model';
import {
  CREATE_POT_MUTATION,
  UPDATE_POT_MUTATION,
  DELETE_POT_MUTATION,
  ADD_MONEY_TO_POT_MUTATION,
  WITHDRAW_MONEY_FROM_POT_MUTATION
} from '@/app/core/graphql/finance.operations';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Api } from '@/app/shared/service/api';
import {Currency} from '@/app/core/models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class PotService {
  private apollo = inject(Apollo);
  private api = inject(Api);

  createPot(input: CreatePotInput): Observable<Pot> {
    return this.apollo
      .mutate<{ createPot: Pot }>({
        mutation: CREATE_POT_MUTATION,
        variables: { input }
      })
      .pipe(
        map(result => {
          if (!result.data?.createPot) {
            throw new Error('Failed to create pot');
          }
          this.api.loadPots(input.currency);
          return result.data.createPot;
        })
      );
  }

  updatePot(id: string, input: UpdatePotInput): Observable<Pot> {
    return this.apollo
      .mutate<{ updatePot: Pot }>({
        mutation: UPDATE_POT_MUTATION,
        variables: { id, input }
      })
      .pipe(
        map(result => {
          if (!result.data?.updatePot) {
            throw new Error('Failed to update pot');
          }
          this.api.loadPots(input.currency);
          return result.data.updatePot;
        })
      );
  }

  deletePot(id: string, currency?: Currency): Observable<boolean> {
    return this.apollo
      .mutate<{ deletePot: boolean }>({
        mutation: DELETE_POT_MUTATION,
        variables: { id }
      })
      .pipe(
        map(result => {
          const success = result.data?.deletePot ?? false;
          if (success) {
            this.api.loadPots(currency);
          }
          return success;
        })
      );
  }

  addMoneyToPot(id: string, amount: number, currency?: Currency): Observable<Pot> {
    return this.apollo
      .mutate<{ addMoneyToPot: Pot }>({
        mutation: ADD_MONEY_TO_POT_MUTATION,
        variables: { id, amount }
      })
      .pipe(
        map(result => {
          if (!result.data?.addMoneyToPot) {
            throw new Error('Failed to add money to pot');
          }
          this.api.loadPots(currency);
          return result.data.addMoneyToPot;
        })
      );
  }

  withdrawMoneyFromPot(id: string, amount: number, currency?: Currency): Observable<Pot> {
    return this.apollo
      .mutate<{ withdrawMoneyFromPot: Pot }>({
        mutation: WITHDRAW_MONEY_FROM_POT_MUTATION,
        variables: { id, amount }
      })
      .pipe(
        map(result => {
          if (!result.data?.withdrawMoneyFromPot) {
            throw new Error('Failed to withdraw money from pot');
          }
          this.api.loadPots(currency);
          return result.data.withdrawMoneyFromPot;
        })
      );
  }
}
