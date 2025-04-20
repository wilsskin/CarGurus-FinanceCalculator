
import React, { useState } from 'react';
import { useFinance } from '../../context/FinanceContext';
import { formatCurrency } from '../../utils/financeCalculator';

/**
 * Component for entering trade-in information
 */
const TradeIn: React.FC = () => {
  const { state, dispatch } = useFinance();
  const { tradeIn } = state;
  
  const [showTradeIn, setShowTradeIn] = useState(false);
  
  const handleTradeInValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(event.target.value) || 0;
    dispatch({ 
      type: 'SET_TRADE_IN', 
      payload: { value } 
    });
  };
  
  const handleOwedAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const owedAmount = parseFloat(event.target.value) || 0;
    dispatch({ 
      type: 'SET_TRADE_IN', 
      payload: { owedAmount } 
    });
  };
  
  const toggleTradeIn = () => {
    setShowTradeIn(!showTradeIn);
    if (!showTradeIn) {
      // Reset trade-in values when revealing the section
      if (tradeIn.value === 0 && tradeIn.owedAmount === 0) {
        // Only reset if the user hasn't entered values yet
        dispatch({ 
          type: 'SET_TRADE_IN', 
          payload: { value: 0, owedAmount: 0 } 
        });
      }
    } else {
      // Clear trade-in values when hiding the section
      dispatch({ 
        type: 'SET_TRADE_IN', 
        payload: { value: 0, owedAmount: 0 } 
      });
    }
  };
  
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6 animate-slide-in">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Trade-In</h2>
        
        <button
          onClick={toggleTradeIn}
          className={`
            text-sm font-medium px-3 py-1 rounded-full transition-colors
            ${showTradeIn 
              ? 'bg-finance-purple text-white' 
              : 'bg-gray-100 text-gray-700 hover:bg-finance-purple-light'}
          `}
        >
          {showTradeIn ? 'Remove' : 'Add Trade-In'}
        </button>
      </div>
      
      {!showTradeIn ? (
        <p className="text-finance-gray-neutral text-sm">
          Adding trade-in information can significantly impact your payment estimate.
        </p>
      ) : (
        <div className="space-y-4 mt-4 animate-fade-in">
          {/* Trade-in value */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Vehicle Value
            </label>
            
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm">$</span>
              </div>
              <input
                type="number"
                value={tradeIn.value}
                onChange={handleTradeInValueChange}
                className="block w-full pl-7 py-3 border border-gray-300 rounded-md focus:ring-finance-purple focus:border-finance-purple"
                placeholder="0"
                min="0"
              />
            </div>
            
            <div className="mt-1 text-sm text-finance-gray-neutral">
              Estimated trade-in value
            </div>
          </div>
          
          {/* Amount owed */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Amount Owed (Optional)
            </label>
            
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm">$</span>
              </div>
              <input
                type="number"
                value={tradeIn.owedAmount}
                onChange={handleOwedAmountChange}
                className="block w-full pl-7 py-3 border border-gray-300 rounded-md focus:ring-finance-purple focus:border-finance-purple"
                placeholder="0"
                min="0"
              />
            </div>
            
            <div className="mt-1 text-sm text-finance-gray-neutral">
              Current loan or lease balance
            </div>
          </div>
          
          {/* Trade equity summary */}
          {(tradeIn.value > 0 || tradeIn.owedAmount > 0) && (
            <div className={`
              mt-4 p-3 rounded-md text-sm
              ${tradeIn.netValue > 0 
                ? 'bg-green-50 text-green-800' 
                : tradeIn.value < tradeIn.owedAmount 
                  ? 'bg-red-50 text-red-800' 
                  : 'bg-gray-50 text-gray-800'}
            `}>
              {tradeIn.netValue > 0 ? (
                <>
                  <div className="font-medium">
                    {formatCurrency(tradeIn.netValue)} in positive equity
                  </div>
                  <div>This amount will be applied to your purchase.</div>
                </>
              ) : tradeIn.value < tradeIn.owedAmount ? (
                <>
                  <div className="font-medium">
                    {formatCurrency(tradeIn.owedAmount - tradeIn.value)} in negative equity
                  </div>
                  <div>This amount may be added to your new loan.</div>
                </>
              ) : (
                <div>Your trade-in has no equity.</div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TradeIn;
