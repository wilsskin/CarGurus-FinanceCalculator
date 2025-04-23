
export type PaymentType = 'dealer' | 'outside' | 'cash';

export interface TradeInInfo {
  value: number;
  owedAmount: number;
  netValue: number;
}

export interface TaxesAndFees {
  taxRate: number;
  taxAmount: number;
  registrationFee: number;
  documentFee: number;
  dealerFee: number;
  otherFees: number;
  totalFees: number;
}

export interface LoanDetails {
  downPayment: number;
  termMonths: number;
  interestRate: number;
}

export interface FinanceCalculatorState {
  carPrice: number;
  paymentType: PaymentType;
  loanDetails: LoanDetails;
  tradeIn: TradeInInfo;
  taxesAndFees: TaxesAndFees;
  zipCode: string;
  monthlyPayment: number;
  totalCost: number;
  estimateAccuracy: number;
  addonsTotal: number;
  discounts: number;
  creditScore?: number;
}
