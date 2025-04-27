import React from 'react';
import { useFinance } from '@/context/finance';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { formatCurrency } from '@/utils/financeCalculator';
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

  const handleDownPaymentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(event.target.value) || 0;
    dispatch({
      type: 'SET_LOAN_DETAILS',
      payload: { downPayment: value }
    });
  };

  const handlePaymentGoalChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(event.target.value) || 0;
    dispatch({
      type: 'SET_LOAN_DETAILS',
      payload: { monthlyPaymentGoal: value }
    });
  };

  return (
    <section className="space-y-4">
      <h2 className="text-xl font-bold text-[#1EAEDB]">My Finance Info</h2>
      
      <div className="space-y-4">
        {/* Credit Score Field */}
        <div className="space-y-1.5">
          <label className="text-sm font-semibold text-gray-700">
            Credit Score
          </label>
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
        
        {/* Loan Term */}
        {state.paymentType !== 'cash' && (
          <div className="space-y-1.5">
            <label className="block text-sm font-semibold text-gray-700">
              Loan Term
            </label>
            <div className="grid grid-cols-5 gap-2">
              {[36, 48, 60, 72, 84].map(months => (
                <button
                  key={months}
                  onClick={() => dispatch({
                    type: 'SET_LOAN_DETAILS',
                    payload: { termMonths: months }
                  })}
                  className={`
                    py-2 px-1 rounded-lg text-sm font-medium transition-colors
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
        
        {/* Down Payment Field */}
        <div className="space-y-1.5">
          <label className="text-sm font-semibold text-gray-700">
            Down Payment
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
            <Input
              type="number"
              value={state.loanDetails.downPayment || ''}
              onChange={handleDownPaymentChange}
              className="pl-8"
              placeholder="Enter down payment"
            />
          </div>
          <p className="text-sm text-gray-500">
            {state.loanDetails.downPayment > 0 && `${Math.round((state.loanDetails.downPayment / state.carPrice) * 100)}% of vehicle price`}
          </p>
        </div>

        {/* Monthly Payment Goal */}
        <div className="space-y-1.5">
          <label className="text-sm font-semibold text-gray-700">
            Monthly Payment Goal
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
            <Input
              type="number"
              value={state.loanDetails.monthlyPaymentGoal || ''}
              onChange={handlePaymentGoalChange}
              className="pl-8"
              placeholder="Enter target monthly payment"
            />
          </div>
        </div>
      </div>
      
      <AdjustmentSuggestions />
    </section>
  );
};

export default MyFinanceInfo;
