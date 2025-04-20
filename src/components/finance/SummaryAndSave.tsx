
import React, { useState } from 'react';
import { useFinance } from '../../context/FinanceContext';
import { formatCurrency } from '../../utils/financeCalculator';
import TipCard from './TipCard';

/**
 * Component for displaying finance summary and save options
 */
const SummaryAndSave: React.FC = () => {
  const { state } = useFinance();
  const { 
    carPrice, 
    paymentType,
    loanDetails,
    tradeIn,
    taxesAndFees,
    monthlyPayment,
    totalCost
  } = state;
  
  const [showToast, setShowToast] = useState(false);
  
  const handleSave = () => {
    // In a real app, this would save to user profile or generate PDF
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };
  
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-20 animate-slide-in">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Summary & Save</h2>
      
      <div className="space-y-4">
        {/* Vehicle information */}
        <div className="pb-3 border-b border-gray-200">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Vehicle Information</h3>
          <div className="text-lg font-medium">{formatCurrency(carPrice)}</div>
        </div>
        
        {/* Payment information */}
        <div className="pb-3 border-b border-gray-200">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Payment Information</h3>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <div className="text-gray-700">Payment Type</div>
              <div className="font-medium">
                {paymentType === 'dealer' 
                  ? 'Dealer Financing' 
                  : paymentType === 'outside'
                    ? 'Outside Loan'
                    : 'Cash'}
              </div>
            </div>
            
            {paymentType !== 'cash' && (
              <>
                <div className="flex justify-between">
                  <div className="text-gray-700">Down Payment</div>
                  <div className="font-medium">{formatCurrency(loanDetails.downPayment)}</div>
                </div>
                
                <div className="flex justify-between">
                  <div className="text-gray-700">Loan Term</div>
                  <div className="font-medium">{loanDetails.termMonths} months</div>
                </div>
                
                <div className="flex justify-between">
                  <div className="text-gray-700">Interest Rate</div>
                  <div className="font-medium">{loanDetails.interestRate}%</div>
                </div>
                
                <div className="flex justify-between">
                  <div className="text-gray-700">Monthly Payment</div>
                  <div className="font-medium">{formatCurrency(monthlyPayment)}</div>
                </div>
              </>
            )}
          </div>
        </div>
        
        {/* Trade-in */}
        {tradeIn.value > 0 && (
          <div className="pb-3 border-b border-gray-200">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Trade-In</h3>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <div className="text-gray-700">Vehicle Value</div>
                <div className="font-medium">{formatCurrency(tradeIn.value)}</div>
              </div>
              
              {tradeIn.owedAmount > 0 && (
                <div className="flex justify-between">
                  <div className="text-gray-700">Amount Owed</div>
                  <div className="font-medium">{formatCurrency(tradeIn.owedAmount)}</div>
                </div>
              )}
              
              <div className="flex justify-between">
                <div className="text-gray-700">Net Trade-In Value</div>
                <div className="font-medium">{formatCurrency(tradeIn.netValue)}</div>
              </div>
            </div>
          </div>
        )}
        
        {/* Taxes and fees */}
        <div className="pb-3 border-b border-gray-200">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Taxes & Fees</h3>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <div className="text-gray-700">Sales Tax ({taxesAndFees.taxRate}%)</div>
              <div className="font-medium">{formatCurrency(taxesAndFees.taxAmount)}</div>
            </div>
            
            <div className="flex justify-between">
              <div className="text-gray-700">Registration & Other Fees</div>
              <div className="font-medium">{formatCurrency(taxesAndFees.totalFees)}</div>
            </div>
          </div>
        </div>
        
        {/* Total cost */}
        <div className="pt-2">
          <div className="flex justify-between items-center">
            <div className="text-lg font-medium text-gray-800">Total Cost</div>
            <div className="text-xl font-bold text-finance-purple">{formatCurrency(totalCost)}</div>
          </div>
        </div>
      </div>
      
      {/* Negotiation tip */}
      {paymentType !== 'cash' && (
        <div className="mt-6">
          <TipCard 
            tipText="This estimate can help you negotiate with confidence. Remember, the interest rate is often negotiable at the dealership."
            tipType="success"
            dismissible={false}
          />
        </div>
      )}
      
      {/* Action buttons */}
      <div className="mt-8 space-y-3">
        <button
          onClick={handleSave}
          className="w-full py-3 bg-finance-purple text-white font-medium rounded-md hover:bg-finance-purple-dark transition-colors duration-200 flex justify-center items-center"
        >
          <svg 
            className="w-5 h-5 mr-2" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Download Estimate
        </button>
        
        <button
          onClick={handleSave}
          className="w-full py-3 bg-white text-finance-purple font-medium rounded-md border border-finance-purple hover:bg-finance-purple-light transition-colors duration-200"
        >
          Save to Profile
        </button>
      </div>
      
      {/* Toast */}
      {showToast && (
        <div className="fixed bottom-5 left-0 right-0 mx-auto w-4/5 max-w-sm bg-finance-purple-dark text-white p-3 rounded-lg shadow-lg animate-fade-in flex items-center justify-center">
          <svg 
            className="w-5 h-5 mr-2" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span>Estimate saved successfully!</span>
        </div>
      )}
    </div>
  );
};

export default SummaryAndSave;
