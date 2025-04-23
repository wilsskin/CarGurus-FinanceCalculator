
import { FinanceCalculatorState } from '../../../types/financeTypes';
import { estimateTaxRate, calculateTaxAmount } from '../../../utils/financeCalculator';

export const zipCodeReducer = (
  state: FinanceCalculatorState, 
  payload: string
): FinanceCalculatorState => {
  // When zip code changes, we should recalculate tax rate
  const taxRate = estimateTaxRate(payload);
  const taxAmount = calculateTaxAmount(state.carPrice, taxRate);
  
  return {
    ...state,
    zipCode: payload,
    taxesAndFees: {
      ...state.taxesAndFees,
      taxRate,
      taxAmount
    }
  };
};
