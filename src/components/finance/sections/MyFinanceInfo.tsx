import React from 'react';
import { useFinance } from '@/context/finance';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import LockButton from '../LockButton';
import AdjustmentSuggestions from '../AdjustmentSuggestions';
import { LockableField } from '@/types/financeTypes';

const creditScoreRanges = [
  { label: 'Excellent (720+)', value: '720' },
  { label: 'Good (690-719)', value: '690' },
  { label: 'Fair (630-689)', value: '630' },
  { label: 'Poor (Below 630)', value: '629' },
];

const MyFinanceInfo: React.FC = () => {
  const { state, dispatch } = useFinance();
  
  const handleLockToggle = (field: LockableField, value: number) => {
    if (state.lockedField === field) {
      dispatch({ type: 'LOCK_FIELD', payload: null });
    } else {
      dispatch({ type: 'LOCK_FIELD', payload: { field, value } });
    }
  };

  const handleCreditScoreChange = (value: string) => {
    dispatch({ 
      type: 'SET_CREDIT_SCORE', 
      payload: parseInt(value) 
    });
  };

  return (
    <section className="space-y-6">
      <h2 className="text-xl font-bold text-[#1EAEDB]">My Finance Info</h2>
      
      <div className="grid grid-cols-2 gap-6">
        {/* Credit Score Field */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-semibold text-gray-700">
              Credit Score
            </label>
            <LockButton
              isLocked={state.lockedField === 'creditScore'}
              onToggle={() => handleLockToggle('creditScore', state.creditScore || 0)}
            />
          </div>
          <Select
            value={state.creditScore?.toString()}
            onValueChange={handleCreditScoreChange}
            disabled={state.lockedField === 'creditScore'}
          >
            <SelectTrigger className="w-full font-medium">
              <SelectValue placeholder="Select score" />
            </SelectTrigger>
            <SelectContent>
              {creditScoreRanges.map(range => (
                <SelectItem key={range.value} value={range.value}>
                  {range.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        {/* Loan Details */}
        {state.paymentType !== 'cash' && (
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">
              Loan Term
            </label>
            <div className="grid grid-cols-3 gap-1">
              {[36, 48, 60, 72, 84].map(months => (
                <button
                  key={months}
                  onClick={() => dispatch({
                    type: 'SET_LOAN_DETAILS',
                    payload: { termMonths: months }
                  })}
                  className={`
                    py-2 px-1 rounded-lg text-xs font-medium transition-colors
                    ${state.loanDetails.termMonths === months
                      ? 'bg-[#1EAEDB] text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }
                  `}
                >
                  {months / 12}yr
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
      
      {/* Down Payment */}
      {state.paymentType !== 'cash' && (
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700">
            Down Payment
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500 sm:text-sm">$</span>
            </div>
            <input
              type="number"
              value={state.loanDetails.downPayment}
              onChange={(e) => dispatch({
                type: 'SET_LOAN_DETAILS',
                payload: { downPayment: parseFloat(e.target.value) || 0 }
              })}
              className="block w-full pl-7 py-3 border border-gray-300 rounded-lg focus:ring-[#1EAEDB] focus:border-[#1EAEDB] font-medium"
              placeholder="Enter down payment"
            />
          </div>
        </div>
      )}
      
      <AdjustmentSuggestions />
    </section>
  );
};

export default MyFinanceInfo;
