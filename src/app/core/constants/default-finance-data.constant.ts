import { FinanceData } from "../models/finance-data.model";

export const DEFAULT_FINANCE_DATA: FinanceData = {
    transactions: [],
    budgets: [],
    pots: [],
    balance: { current: 0, income: 0, expenses: 0,currency:'USD' }
  };
