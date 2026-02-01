
import { FinanceCalculatorState } from '../../../types/financeTypes';
import { getInterestRateForCreditScore } from '../../../utils/financeCalculator';

export const creditScoreReducer = (
  state: FinanceCalculatorState, 
  payload: number
): FinanceCalculatorState => {
  if (state.paymentType === 'cash') {
    return { ...state, creditScore: payload };
  }
  const interestRate = getInterestRateForCreditScore(payload, state.paymentType);
  return {
    ...state,
    creditScore: payload,
    loanDetails: { ...state.loanDetails, interestRate }
  };
};
