import { FinanceCalculatorState } from '../../types/financeTypes';

// Default values - Preset for average car buyer
export const DEFAULT_CAR_PRICE = 35000;
export const DEFAULT_ZIP_CODE = '90210';
export const DEFAULT_TERM_MONTHS = 60;  // Most popular: 5 years
export const DEFAULT_INTEREST_RATE = 6.7; // Based on current rates
export const DEFAULT_DOWN_PAYMENT = 3500; // 10% of car price
export const DEFAULT_CREDIT_SCORE = 690; // Good credit - average buyer

// Initial state with sensible defaults for average car buyer
export const initialState: FinanceCalculatorState = {
  carPrice: DEFAULT_CAR_PRICE,
  paymentType: 'dealer',
  creditScore: DEFAULT_CREDIT_SCORE,
  loanDetails: {
    downPayment: DEFAULT_DOWN_PAYMENT,
    termMonths: DEFAULT_TERM_MONTHS,
    interestRate: DEFAULT_INTEREST_RATE
  },
  tradeIn: {
    value: 0,
    owedAmount: 0,
    netValue: 0
  },
  taxesAndFees: {
    taxRate: 8.5, // Average US sales tax
    taxAmount: DEFAULT_CAR_PRICE * 0.085,
    registrationFee: 300,
    documentFee: 100,
    dealerFee: 250,
    otherFees: 0,
    totalFees: 650
  },
  zipCode: DEFAULT_ZIP_CODE,
  monthlyPayment: 0,
  totalCost: 0,
  estimateAccuracy: 75,
  addonsTotal: 0,
  discounts: 0,
  selectedAddons: {}
};
