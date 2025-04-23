
import { FinanceCalculatorState, LoanDetails } from '../../../types/financeTypes';

export const loanDetailsReducer = (
  state: FinanceCalculatorState, 
  payload: Partial<LoanDetails>
): FinanceCalculatorState => {
  return {
    ...state,
    loanDetails: {
      ...state.loanDetails,
      ...payload
    }
  };
};
