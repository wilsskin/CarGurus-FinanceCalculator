
import { FinanceCalculatorState } from '../../../types/financeTypes';

export const creditScoreReducer = (
  state: FinanceCalculatorState, 
  payload: number
): FinanceCalculatorState => {
  return {
    ...state,
    creditScore: payload
  };
};
