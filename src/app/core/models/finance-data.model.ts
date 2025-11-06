import {Theme} from '@/app/core/models/theme.model';
import { Currency } from './auth.model';

export interface Balance {
    current: number;
    income: number;
    expenses: number;
    currency: string;
  }

  export interface Transaction {
    id?: string;
    avatar?: string;
    name: string;
    category: string;
    date: string;
    amount: number;
    currency: string;
    recurring: boolean;
  }

  export interface Budget {
    id?: string;
    category: string;
    maximum: number;
    spent: number;
    currency?: string;
    theme: string;
  }

export interface BudgetDognut {
  id: string;
  category: string;
  spent: number;
  max: number;
  theme: Theme;
}

  export interface Pot {
    id?: string;
    name: string;
    target: number;
    total: number;
    currency?: string;
    theme: string;
  }

  export interface FinanceData {
    balance: Balance;
    transactions: Transaction[];
    budgets: Budget[];
    pots: Pot[];
  }

  // Input types for mutations
  export interface CreateTransactionInput {
    name: string;
    category: string;
    date: string;
    amount: number;
    currency?: Currency;
    avatar?: string;
    recurring?: boolean;
  }

  export interface UpdateTransactionInput {
    name?: string;
    category?: string;
    date?: string;
    amount?: number;
    currency?: Currency;
    avatar?: string;
    recurring?: boolean;
  }

  export interface CreateBudgetInput {
    category: string;
    maximum: number;
    currency?: Currency;
    theme: string;
  }

  export interface UpdateBudgetInput {
    category?: string;
    maximum?: number;
    currency?: Currency;
    theme?: string;
  }

  export interface CreatePotInput {
    name: string;
    target: number;
    currency?: Currency;
    theme: string;
  }

  export interface UpdatePotInput {
    name?: string;
    target?: number;
    currency?: Currency;
    theme?: string;
  }

  // Filter and Sort types
  export interface FilterTransactionsInput {
    name?: string;
    category?: string;
    currency?: string;
    recurring?: boolean;
    minAmount?: number;
    maxAmount?: number;
    startDate?: string;
    endDate?: string;
  }

  export enum SortBy {
    NAME = 'NAME',
    CATEGORY = 'CATEGORY',
    DATE = 'DATE',
    AMOUNT = 'AMOUNT',
    CREATED_AT = 'CREATED_AT'
  }

  export enum SortOrder {
    ASC = 'ASC',
    DESC = 'DESC'
  }

  export interface SortTransactionsInput {
    sortBy?: SortBy;
    sortOrder?: SortOrder;
  }
