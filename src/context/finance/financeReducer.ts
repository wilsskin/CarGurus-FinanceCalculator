import { FinanceCalculatorState } from '../../types/financeTypes';
import { FinanceAction } from './types';
import { carPriceReducer } from './reducers/carPriceReducer';
import { paymentTypeReducer } from './reducers/paymentTypeReducer';
import { loanDetailsReducer } from './reducers/loanDetailsReducer';
import { tradeInReducer } from './reducers/tradeInReducer';
import { taxesAndFeesReducer } from './reducers/taxesAndFeesReducer';
import { zipCodeReducer } from './reducers/zipCodeReducer';
import { creditScoreReducer } from './reducers/creditScoreReducer';
import { addonsReducer } from './reducers/addonsReducer';
import { calculationsReducer } from './reducers/calculationsReducer';
import { resetFormReducer } from './reducers/resetFormReducer';

export const financeReducer = (
  state: FinanceCalculatorState, 
  action: FinanceAction
): FinanceCalculatorState => {
  switch (action.type) {
    case 'SET_CAR_PRICE':
      return carPriceReducer(state, action.payload);
    
    case 'SET_PAYMENT_TYPE':
      return paymentTypeReducer(state, action.payload);
    
    case 'SET_LOAN_DETAILS':
      return loanDetailsReducer(state, action.payload);
    
    case 'SET_TRADE_IN':
      return tradeInReducer(state, action.payload);
    
    case 'SET_TAXES_AND_FEES':
      return taxesAndFeesReducer(state, action.payload);
    
    case 'SET_ZIP_CODE':
      return zipCodeReducer(state, action.payload);
    
    case 'SET_CREDIT_SCORE':
      return creditScoreReducer(state, action.payload);
      
    case 'UPDATE_ADDONS_TOTAL':
      return addonsReducer(state, action.payload);
    
    case 'UPDATE_CALCULATIONS':
      return calculationsReducer(state);
    
    case 'RESET_FORM':
      return resetFormReducer(state);
    
    case 'UPDATE_DISCOUNTS':
      return {
        ...state,
        discounts: action.payload
      };
    
    case 'UPDATE_SELECTED_ADDONS':
      return {
        ...state,
        selectedAddons: action.payload
      };
    
    default:
      return state;
  }
};
