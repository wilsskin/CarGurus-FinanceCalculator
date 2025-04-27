import React from 'react';
import { useFinance } from '@/context/finance';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import AdjustmentSuggestions from '../AdjustmentSuggestions';

const creditScoreRanges = [
  { label: 'Excellent (720+)', value: '720' },
  { label: 'Good (690-719)', value: '690' },
  { label: 'Fair (630-689)', value: '630' },
  { label: 'Poor (Below 630)', value: '629' },
];

const MyFinanceInfo: React.FC = () => {
  const { state, dispatch } = useFinance();

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
          </div>
          <Select
            value={state.creditScore?.toString()}
            onValueChange={handleCreditScoreChange}
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
      
      <AdjustmentSuggestions />
    </section>
  );
};

export default MyFinanceInfo;
