import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { 
  FinanceCalculatorState, 
  PaymentType,
  LoanDetails,
  TradeInInfo,
  TaxesAndFees
} from '../types/financeTypes';
import { 
  calculateMonthlyPayment, 
  calculateLoanAmount,
  calculateTotalLoanCost,
  estimateTaxRate,
  calculateTaxAmount,
  estimateFees
} from '../utils/financeCalculator';

// Default values
const DEFAULT_CAR_PRICE = 25000;
const DEFAULT_ZIP_CODE = '90210';
const DEFAULT_TERM_MONTHS = 60;
const DEFAULT_INTEREST_RATE = 5.9;
const DEFAULT_DOWN_PAYMENT_PERCENT = 10;

// Initial state
const initialState: FinanceCalculatorState = {
  carPrice: DEFAULT_CAR_PRICE,
  paymentType: 'dealer',
  loanDetails: {
    downPayment: DEFAULT_CAR_PRICE * (DEFAULT_DOWN_PAYMENT_PERCENT / 100),
    termMonths: DEFAULT_TERM_MONTHS,
    interestRate: DEFAULT_INTEREST_RATE
  },
  tradeIn: {
    value: 0,
    owedAmount: 0,
    netValue: 0
  },
  taxesAndFees: {
    taxRate: 0,
    taxAmount: 0,
    registrationFee: 300,
    documentFee: 100,
    dealerFee: 250,
    otherFees: 0,
    totalFees: 650
  },
  zipCode: DEFAULT_ZIP_CODE,
  monthlyPayment: 0,
  totalCost: 0,
  estimateAccuracy: 60, // Starting estimate accuracy
  addonsTotal: 0,       // Initialize addonsTotal
  discounts: 0          // Initialize discounts
};

// Action types
type ActionType = 
  | { type: 'SET_CAR_PRICE'; payload: number }
  | { type: 'SET_PAYMENT_TYPE'; payload: PaymentType }
  | { type: 'SET_LOAN_DETAILS'; payload: Partial<LoanDetails> }
  | { type: 'SET_TRADE_IN'; payload: Partial<TradeInInfo> }
  | { type: 'SET_TAXES_AND_FEES'; payload: Partial<TaxesAndFees> }
  | { type: 'SET_ZIP_CODE'; payload: string }
  | { type: 'SET_CREDIT_SCORE'; payload: number }
  | { type: 'UPDATE_ADDONS_TOTAL'; payload: number }
  | { type: 'UPDATE_CALCULATIONS' }
  | { type: 'RESET_FORM' };

// Reducer
const financeReducer = (state: FinanceCalculatorState, action: ActionType): FinanceCalculatorState => {
  switch (action.type) {
    case 'SET_CAR_PRICE':
      return {
        ...state,
        carPrice: action.payload
      };
    
    case 'SET_PAYMENT_TYPE':
      return {
        ...state,
        paymentType: action.payload
      };
    
    case 'SET_LOAN_DETAILS':
      return {
        ...state,
        loanDetails: {
          ...state.loanDetails,
          ...action.payload
        }
      };
    
    case 'SET_TRADE_IN':
      const updatedTradeIn = {
        ...state.tradeIn,
        ...action.payload
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
    
    case 'SET_TAXES_AND_FEES':
      const updatedTaxesAndFees = {
        ...state.taxesAndFees,
        ...action.payload
      };
      
      // Calculate total fees
      const totalFees = 
        updatedTaxesAndFees.registrationFee + 
        updatedTaxesAndFees.documentFee + 
        updatedTaxesAndFees.dealerFee + 
        updatedTaxesAndFees.otherFees;
      
      return {
        ...state,
        taxesAndFees: {
          ...updatedTaxesAndFees,
          totalFees
        }
      };
    
    case 'SET_ZIP_CODE':
      // When zip code changes, we should recalculate tax rate
      const taxRate = estimateTaxRate(action.payload);
      const taxAmount = calculateTaxAmount(state.carPrice, taxRate);
      
      return {
        ...state,
        zipCode: action.payload,
        taxesAndFees: {
          ...state.taxesAndFees,
          taxRate,
          taxAmount
        }
      };
    
    case 'SET_CREDIT_SCORE':
      // Handle the credit score action
      return {
        ...state,
        creditScore: action.payload
      };
      
    case 'UPDATE_ADDONS_TOTAL':
      // Handle the addons total action
      return {
        ...state,
        addonsTotal: action.payload
      };
    
    case 'UPDATE_CALCULATIONS':
      // Skip detailed calculations if payment type is cash
      if (state.paymentType === 'cash') {
        return {
          ...state,
          monthlyPayment: 0,
          totalCost: state.carPrice + state.taxesAndFees.taxAmount + state.taxesAndFees.totalFees - state.tradeIn.netValue + (state.addonsTotal || 0) - (state.discounts || 0),
          estimateAccuracy: 95 // Cash is pretty accurate
        };
      }
      
      // Calculate loan amount
      const loanAmount = calculateLoanAmount(
        state.carPrice,
        state.loanDetails.downPayment,
        state.tradeIn.value,
        state.tradeIn.owedAmount,
        state.taxesAndFees.taxAmount,
        state.taxesAndFees.totalFees
      );
      
      // Calculate monthly payment
      const monthlyPayment = calculateMonthlyPayment(
        loanAmount,
        state.loanDetails.interestRate,
        state.loanDetails.termMonths
      );
      
      // Calculate total cost
      const totalLoanCost = calculateTotalLoanCost(monthlyPayment, state.loanDetails.termMonths);
      const totalCost = totalLoanCost + state.loanDetails.downPayment;
      
      // Calculate estimate accuracy based on filled fields
      let estimateAccuracy = 60; // Base accuracy
      
      // Improve accuracy as more fields are filled with meaningful values
      if (state.loanDetails.downPayment > 0) estimateAccuracy += 5;
      if (state.loanDetails.interestRate !== DEFAULT_INTEREST_RATE) estimateAccuracy += 10;
      if (state.tradeIn.value > 0) estimateAccuracy += 5;
      if (state.zipCode !== DEFAULT_ZIP_CODE) estimateAccuracy += 5;
      if (state.paymentType === 'outside') estimateAccuracy += 5;
      if (estimateAccuracy > 95) estimateAccuracy = 95; // Cap at 95%
      
      return {
        ...state,
        monthlyPayment,
        totalCost,
        estimateAccuracy
      };
    
    case 'RESET_FORM':
      return {
        ...initialState,
        carPrice: state.carPrice, // Keep the car price
        zipCode: state.zipCode // Keep the zip code
      };
    
    default:
      return state;
  }
};

// Context interface
interface FinanceContextType {
  state: FinanceCalculatorState;
  dispatch: React.Dispatch<ActionType>;
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
    state.taxesAndFees.totalFees
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
