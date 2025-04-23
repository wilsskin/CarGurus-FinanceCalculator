
import { FinanceCalculatorState } from '../../../types/financeTypes';
import { 
  calculateMonthlyPayment, 
  calculateLoanAmount,
  calculateTotalLoanCost
} from '../../../utils/financeCalculator';
import { DEFAULT_INTEREST_RATE, DEFAULT_ZIP_CODE } from '../initialState';

export const calculationsReducer = (state: FinanceCalculatorState): FinanceCalculatorState => {
  // Skip detailed calculations if payment type is cash
  if (state.paymentType === 'cash') {
    return {
      ...state,
      monthlyPayment: 0,
      totalCost: state.carPrice + state.taxesAndFees.taxAmount + state.taxesAndFees.totalFees - 
                 state.tradeIn.netValue + (state.addonsTotal || 0) - (state.discounts || 0),
      estimateAccuracy: 95 // Cash is pretty accurate
    };
  }
  
  // Calculate loan amount
  const loanAmount = calculateLoanAmount(
    state.carPrice,
    state.loanDetails.downPayment,
    state.tradeIn.value,
    state.tradeIn.owedAmount,
    state.taxesAndFees.taxAmount,
    state.taxesAndFees.totalFees
  );
  
  // Calculate monthly payment
  const monthlyPayment = calculateMonthlyPayment(
    loanAmount,
    state.loanDetails.interestRate,
    state.loanDetails.termMonths
  );
  
  // Calculate total cost
  const totalLoanCost = calculateTotalLoanCost(monthlyPayment, state.loanDetails.termMonths);
  const totalCost = totalLoanCost + state.loanDetails.downPayment;
  
  // Calculate estimate accuracy based on filled fields
  let estimateAccuracy = 60; // Base accuracy
  
  // Improve accuracy as more fields are filled with meaningful values
  if (state.loanDetails.downPayment > 0) estimateAccuracy += 5;
  if (state.loanDetails.interestRate !== DEFAULT_INTEREST_RATE) estimateAccuracy += 10;
  if (state.tradeIn.value > 0) estimateAccuracy += 5;
  if (state.zipCode !== DEFAULT_ZIP_CODE) estimateAccuracy += 5;
  if (state.paymentType === 'outside') estimateAccuracy += 5;
  if (estimateAccuracy > 95) estimateAccuracy = 95; // Cap at 95%
  
  return {
    ...state,
    monthlyPayment,
    totalCost,
    estimateAccuracy
  };
};
