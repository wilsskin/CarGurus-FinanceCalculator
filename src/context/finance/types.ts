
import { PaymentType, LoanDetails, TradeInInfo, TaxesAndFees, LockableField } from '../../types/financeTypes';

export type FinanceAction = 
  | { type: 'SET_CAR_PRICE'; payload: number }
  | { type: 'SET_PAYMENT_TYPE'; payload: PaymentType }
  | { type: 'SET_LOAN_DETAILS'; payload: Partial<LoanDetails> }
  | { type: 'SET_TRADE_IN'; payload: Partial<TradeInInfo> }
  | { type: 'SET_TAXES_AND_FEES'; payload: Partial<TaxesAndFees> }
  | { type: 'SET_ZIP_CODE'; payload: string }
  | { type: 'SET_CREDIT_SCORE'; payload: number }
  | { type: 'UPDATE_ADDONS_TOTAL'; payload: number }
  | { type: 'UPDATE_DISCOUNTS'; payload: number }
  | { type: 'UPDATE_CALCULATIONS' }
  | { type: 'RESET_FORM' }
  | { type: 'LOCK_FIELD'; payload: { field: LockableField; value: number; } | null };
