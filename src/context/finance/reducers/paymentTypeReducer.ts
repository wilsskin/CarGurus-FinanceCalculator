
import { FinanceCalculatorState, PaymentType } from '../../../types/financeTypes';
import { getInterestRateForCreditScore } from '../../../utils/financeCalculator';

export const paymentTypeReducer = (
  state: FinanceCalculatorState, 
  payload: PaymentType
): FinanceCalculatorState => {
  // When switching payment type, update interest rate based on credit score if set
  let loanDetails = state.loanDetails;
  if (payload !== 'cash' && state.creditScore) {
    loanDetails = {
      ...state.loanDetails,
      interestRate: getInterestRateForCreditScore(state.creditScore, payload)
    };
  }
  return {
    ...state,
    paymentType: payload,
    loanDetails
  };
};
