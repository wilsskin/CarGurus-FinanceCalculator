
import { FinanceCalculatorState, PaymentType } from '../../../types/financeTypes';

export const paymentTypeReducer = (
  state: FinanceCalculatorState, 
  payload: PaymentType
): FinanceCalculatorState => {
  return {
    ...state,
    paymentType: payload
  };
};
