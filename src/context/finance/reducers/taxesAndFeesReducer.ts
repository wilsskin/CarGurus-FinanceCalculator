
import { FinanceCalculatorState, TaxesAndFees } from '../../../types/financeTypes';

export const taxesAndFeesReducer = (
  state: FinanceCalculatorState, 
  payload: Partial<TaxesAndFees>
): FinanceCalculatorState => {
  const updatedTaxesAndFees = {
    ...state.taxesAndFees,
    ...payload
  };
  
  // Calculate total fees
  const totalFees = 
    updatedTaxesAndFees.registrationFee + 
    updatedTaxesAndFees.documentFee + 
    updatedTaxesAndFees.dealerFee + 
    updatedTaxesAndFees.otherFees;
  
  return {
    ...state,
    taxesAndFees: {
      ...updatedTaxesAndFees,
      totalFees
    }
  };
};
