
import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { FinanceCalculatorState } from '../../types/financeTypes';
import { FinanceAction } from './types';
import { financeReducer } from './financeReducer';
import { initialState } from './initialState';

// Context interface
interface FinanceContextType {
  state: FinanceCalculatorState;
  dispatch: React.Dispatch<FinanceAction>;
}

// Create context
const FinanceContext = createContext<FinanceContextType | undefined>(undefined);

// Provider component
export const FinanceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(financeReducer, initialState);
  
  // Initial calculations when component mounts
  useEffect(() => {
    // Set initial tax rate and amount based on zip code
    dispatch({ type: 'SET_ZIP_CODE', payload: initialState.zipCode });
    // Update calculations
    dispatch({ type: 'UPDATE_CALCULATIONS' });
  }, []);
  
  // Update calculations whenever relevant state changes
  useEffect(() => {
    dispatch({ type: 'UPDATE_CALCULATIONS' });
  }, [
    state.carPrice, 
    state.paymentType, 
    state.loanDetails.downPayment,
    state.loanDetails.termMonths,
    state.loanDetails.interestRate,
    state.tradeIn.netValue,
    state.taxesAndFees.taxAmount,
    state.taxesAndFees.totalFees,
    state.addonsTotal,    // Add this to trigger recalculation when add-ons change
    state.discounts       // Add this to trigger recalculation when discounts change
  ]);
  
  return (
    <FinanceContext.Provider value={{ state, dispatch }}>
      {children}
    </FinanceContext.Provider>
  );
};

// Custom hook to use the finance context
export const useFinance = () => {
  const context = useContext(FinanceContext);
  if (context === undefined) {
    throw new Error('useFinance must be used within a FinanceProvider');
  }
  return context;
};
