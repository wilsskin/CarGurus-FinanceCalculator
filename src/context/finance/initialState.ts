
import { FinanceCalculatorState } from '../../types/financeTypes';

// Default values
export const DEFAULT_CAR_PRICE = 25000;
export const DEFAULT_ZIP_CODE = '90210';
export const DEFAULT_TERM_MONTHS = 0;  // Changed from 60 to 0
export const DEFAULT_INTEREST_RATE = 0; // Changed from 5.9 to 0
export const DEFAULT_DOWN_PAYMENT_PERCENT = 0; // Changed from 10 to 0

// Initial state
export const initialState: FinanceCalculatorState = {
  carPrice: DEFAULT_CAR_PRICE,
  paymentType: 'dealer',
  loanDetails: {
    downPayment: 0, // Changed from DEFAULT_CAR_PRICE * (DEFAULT_DOWN_PAYMENT_PERCENT / 100)
    termMonths: DEFAULT_TERM_MONTHS,
    interestRate: DEFAULT_INTEREST_RATE
  },
  tradeIn: {
    value: 0,
    owedAmount: 0,
    netValue: 0
  },
  taxesAndFees: {
    taxRate: 0,
    taxAmount: 0,
    registrationFee: 300,
    documentFee: 100,
    dealerFee: 250,
    otherFees: 0,
    totalFees: 650
  },
  zipCode: DEFAULT_ZIP_CODE,
  monthlyPayment: 0,
  totalCost: 0,
  estimateAccuracy: 60,
  addonsTotal: 0,
  discounts: 0,
  selectedAddons: {}
};
