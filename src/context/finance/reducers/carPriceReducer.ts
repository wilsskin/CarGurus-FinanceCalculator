
import { FinanceCalculatorState } from '../../../types/financeTypes';

export const carPriceReducer = (
  state: FinanceCalculatorState, 
  payload: number
): FinanceCalculatorState => {
  return {
    ...state,
    carPrice: payload
  };
};
