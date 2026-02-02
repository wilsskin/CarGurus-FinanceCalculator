
import { FinanceCalculatorState } from '../../../types/financeTypes';
import { 
  calculateMonthlyPayment, 
  calculateLoanAmount,
  calculateTotalLoanCost
} from '../../../utils/financeCalculator';
import { DEFAULT_ZIP_CODE } from '../initialState';

export const calculationsReducer = (state: FinanceCalculatorState): FinanceCalculatorState => {
  // Always assume dealer financing
  const vehiclePrice = state.carPrice;
  
  // Calculate loan amount
  const loanAmount = calculateLoanAmount(
    vehiclePrice,
    state.loanDetails.downPayment,
    state.tradeIn.value,
    state.tradeIn.owedAmount,
    state.taxesAndFees.taxAmount,
    state.taxesAndFees.totalFees
  );
  
  // Only calculate monthly payment if we have all necessary inputs
  let monthlyPayment = 0;
  if (state.loanDetails.termMonths > 0 && state.loanDetails.interestRate > 0) {
    monthlyPayment = calculateMonthlyPayment(
      loanAmount,
      state.loanDetails.interestRate,
      state.loanDetails.termMonths
    );
  }
  
  // Calculate total cost
  let totalCost = state.loanDetails.downPayment;
  if (monthlyPayment > 0 && state.loanDetails.termMonths > 0) {
    const totalLoanCost = calculateTotalLoanCost(monthlyPayment, state.loanDetails.termMonths);
    totalCost += totalLoanCost;
  } else {
    // If we can't calculate monthly payments, just show the total amount to finance
    totalCost += loanAmount;
  }
  
  // Calculate estimate accuracy based on filled fields
  let estimateAccuracy = 60; // Base accuracy
  
  // Improve accuracy as more fields are filled with meaningful values
  if (state.loanDetails.downPayment > 0) estimateAccuracy += 5;
  if (state.loanDetails.interestRate > 0) estimateAccuracy += 10;
  if (state.loanDetails.termMonths > 0) estimateAccuracy += 10;
  if (state.tradeIn.value > 0) estimateAccuracy += 5;
  if (state.zipCode !== DEFAULT_ZIP_CODE) estimateAccuracy += 5;
  if (estimateAccuracy > 95) estimateAccuracy = 95; // Cap at 95%
  
  return {
    ...state,
    monthlyPayment,
    totalCost,
    estimateAccuracy
  };
};
