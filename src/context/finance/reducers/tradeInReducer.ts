
import { FinanceCalculatorState, TradeInInfo } from '../../../types/financeTypes';

export const tradeInReducer = (
  state: FinanceCalculatorState, 
  payload: Partial<TradeInInfo>
): FinanceCalculatorState => {
  const updatedTradeIn = {
    ...state.tradeIn,
    ...payload
  };
  
  // Calculate net value whenever trade-in values change
  const netValue = Math.max(0, updatedTradeIn.value - updatedTradeIn.owedAmount);
  
  return {
    ...state,
    tradeIn: {
      ...updatedTradeIn,
      netValue
    }
  };
};
