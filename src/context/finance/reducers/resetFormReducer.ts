
import { FinanceCalculatorState } from '../../../types/financeTypes';
import { initialState } from '../initialState';

export const resetFormReducer = (state: FinanceCalculatorState): FinanceCalculatorState => {
  return {
    ...initialState,
    carPrice: state.carPrice, // Keep the car price
    zipCode: state.zipCode // Keep the zip code
  };
};
