
import { FinanceCalculatorState } from '../../../types/financeTypes';

export const addonsReducer = (
  state: FinanceCalculatorState, 
  payload: number
): FinanceCalculatorState => {
  return {
    ...state,
    addonsTotal: payload
  };
};
