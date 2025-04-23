
import { FinanceCalculatorState, LockableField } from '../../../types/financeTypes';

interface LockPayload {
  field: LockableField;
  value: number;
}

export const lockFieldReducer = (
  state: FinanceCalculatorState,
  payload: LockPayload | null
): FinanceCalculatorState => {
  if (!payload) {
    return {
      ...state,
      lockedField: null,
      lockedValue: null
    };
  }

  return {
    ...state,
    lockedField: payload.field,
    lockedValue: payload.value
  };
};
