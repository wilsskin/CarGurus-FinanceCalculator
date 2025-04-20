
import React, { useState, useEffect } from 'react';
import { useFinance } from '../../context/FinanceContext';
import { formatCurrency, calculateMonthlyPayment } from '../../utils/financeCalculator';
import TipCard from './TipCard';

/**
 * Component for entering loan details (down payment, term, interest rate)
 */
const LoanDetails: React.FC = () => {
  const { state, dispatch } = useFinance();
  const { paymentType, loanDetails, carPrice } = state;
  
  const [downPaymentPercent, setDownPaymentPercent] = useState(
    Math.round((loanDetails.downPayment / carPrice) * 100)
  );
  
  // When car price changes, update the down payment percentage
  useEffect(() => {
    setDownPaymentPercent(Math.round((loanDetails.downPayment / carPrice) * 100));
  }, [carPrice, loanDetails.downPayment]);
  
  // Handle down payment changes (either direct amount or percentage)
  const handleDownPaymentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(event.target.value) || 0;
    dispatch({ 
      type: 'SET_LOAN_DETAILS', 
      payload: { downPayment: value } 
    });
    setDownPaymentPercent(Math.round((value / carPrice) * 100));
  };
  
  const handleDownPaymentPercentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const percent = parseFloat(event.target.value) || 0;
    setDownPaymentPercent(percent);
    const newDownPayment = (carPrice * percent) / 100;
    dispatch({ 
      type: 'SET_LOAN_DETAILS', 
      payload: { downPayment: newDownPayment } 
    });
  };
  
  const handleTermChange = (months: number) => {
    dispatch({ 
      type: 'SET_LOAN_DETAILS', 
      payload: { termMonths: months } 
    });
  };
  
  const handleInterestRateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const rate = parseFloat(event.target.value) || 0;
    dispatch({ 
      type: 'SET_LOAN_DETAILS', 
      payload: { interestRate: rate } 
    });
  };
  
  // Only show this component if we're not doing cash payment
  if (paymentType === 'cash') {
    return null;
  }
  
  const termOptions = [36, 48, 60, 72, 84];
  
  // Calculate impact of different down payments
  const calculatePaymentImpact = () => {
    const currentDownPayment = loanDetails.downPayment;
    const increaseAmount = carPrice * 0.05; // 5% more down payment
    const newDownPayment = currentDownPayment + increaseAmount;
    
    // Create a new loan amount with increased down payment
    const currentLoanAmount = carPrice - currentDownPayment;
    const newLoanAmount = carPrice - newDownPayment;
    
    // Calculate the current and new monthly payments
    const currentPayment = calculateMonthlyPayment(
      currentLoanAmount,
      loanDetails.interestRate,
      loanDetails.termMonths
    );
    const newPayment = calculateMonthlyPayment(
      newLoanAmount,
      loanDetails.interestRate,
      loanDetails.termMonths
    );
    
    // Calculate the monthly savings
    const monthlySavings = currentPayment - newPayment;
    
    return {
      increaseAmount: Math.round(increaseAmount),
      monthlySavings: Math.round(monthlySavings)
    };
  };
  
  const { increaseAmount, monthlySavings } = calculatePaymentImpact();
  
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6 animate-slide-in">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Loan Details</h2>
      
      {downPaymentPercent < 20 && monthlySavings > 20 && (
        <TipCard 
          tipText={`Want a lower monthly payment? Adding ${formatCurrency(increaseAmount)} to your down payment could save ${formatCurrency(monthlySavings)} per month.`}
          tipType="info"
        />
      )}
      
      <div className="space-y-6">
        {/* Down payment section */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Down Payment
          </label>
          
          <div className="flex items-center">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm">$</span>
              </div>
              <input
                type="number"
                value={loanDetails.downPayment}
                onChange={handleDownPaymentChange}
                className="block w-full pl-7 pr-12 py-3 border border-gray-300 rounded-md focus:ring-finance-purple focus:border-finance-purple"
                placeholder="0"
                min="0"
                max={carPrice}
              />
            </div>
            
            <div className="mx-4 text-gray-500">or</div>
            
            <div className="relative w-24">
              <input
                type="number"
                value={downPaymentPercent}
                onChange={handleDownPaymentPercentChange}
                className="block w-full pr-8 py-3 border border-gray-300 rounded-md focus:ring-finance-purple focus:border-finance-purple"
                placeholder="0"
                min="0"
                max="100"
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm">%</span>
              </div>
            </div>
          </div>
          
          <div className="mt-1 text-sm text-finance-gray-neutral">
            {downPaymentPercent}% of {formatCurrency(carPrice)}
          </div>
        </div>
        
        {/* Loan term section */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Loan Term
          </label>
          
          <div className="flex flex-wrap gap-2">
            {termOptions.map(months => (
              <button
                key={months}
                onClick={() => handleTermChange(months)}
                className={`
                  px-4 py-2 rounded-md text-sm font-medium transition-colors
                  ${loanDetails.termMonths === months 
                    ? 'bg-finance-purple text-white' 
                    : 'bg-gray-100 text-gray-800 hover:bg-finance-purple-light'}
                `}
              >
                {months === 36 ? '3' : months === 48 ? '4' : months === 60 ? '5' : months === 72 ? '6' : '7'} years
              </button>
            ))}
          </div>
        </div>
        
        {/* Interest rate section */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {paymentType === 'dealer' ? 'Estimated APR' : 'Interest Rate'}
          </label>
          
          <div className="relative">
            <input
              type="number"
              value={loanDetails.interestRate}
              onChange={handleInterestRateChange}
              className="block w-full pr-8 py-3 border border-gray-300 rounded-md focus:ring-finance-purple focus:border-finance-purple"
              placeholder="0"
              step="0.1"
              min="0"
              max="25"
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <span className="text-gray-500 sm:text-sm">%</span>
            </div>
          </div>
          
          {paymentType === 'dealer' && (
            <div className="mt-1 text-sm text-finance-gray-neutral">
              Rates typically range from 3.5% to 9.5% based on credit
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoanDetails;
