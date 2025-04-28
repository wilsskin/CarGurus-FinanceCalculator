
import { FinanceCalculatorState } from '../../../types/financeTypes';
import { 
  calculateMonthlyPayment, 
  calculateLoanAmount,
  calculateTotalLoanCost
} from '../../../utils/financeCalculator';
import { DEFAULT_ZIP_CODE } from '../initialState';

export const calculationsReducer = (state: FinanceCalculatorState): FinanceCalculatorState => {
  // Skip detailed calculations if payment type is cash
  if (state.paymentType === 'cash') {
    // For cash payments, total cost is simply the sum of car price, taxes, fees, 
    // and add-ons minus discounts and trade-in value
    return {
      ...state,
      monthlyPayment: 0,
      totalCost: state.carPrice + state.taxesAndFees.taxAmount + state.taxesAndFees.totalFees + 
                 (state.addonsTotal || 0) - (state.discounts || 0) - state.tradeIn.netValue,
      estimateAccuracy: 95 // Cash is pretty accurate
    };
  }
  
  // Calculate loan amount - include add-ons in base price for financing
  const vehiclePriceWithAddons = state.carPrice + (state.addonsTotal || 0) - (state.discounts || 0);
  
  // Calculate loan amount
  const loanAmount = calculateLoanAmount(
    vehiclePriceWithAddons,
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
  if (state.paymentType === 'outside') estimateAccuracy += 5;
  if (estimateAccuracy > 95) estimateAccuracy = 95; // Cap at 95%
  
  return {
    ...state,
    monthlyPayment,
    totalCost,
    estimateAccuracy
  };
};
