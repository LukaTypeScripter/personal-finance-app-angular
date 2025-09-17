import {Transaction} from '@/app/core/models/finance-data.model';

export interface ILinkedSignal {
  currentPage: number,
  transactions: Transaction[]
}
